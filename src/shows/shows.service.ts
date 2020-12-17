import { Between, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { FilesService } from '../files/files.service';
import { Sku } from '../skus/entities/sku.entity';
import { StripeService } from '../stripe/stripe.service';
import { User } from '../users/entities/user.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { ShowsQueryDto } from './dto/shows-query.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(Sku)
    private readonly skuRepository: Repository<Sku>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly stripeService: StripeService,
    private readonly filesService: FilesService,
  ) {}

  // todo add nested route structure for these association lookups
  // EG todo find all by user id (user/{id}/shows)
  // todo for findall on all objects maybe don't return nested
  // todo need better filters and query params for all too
  findAll(getShowDto: ShowsQueryDto) {
    const { limit, offset, user_id, start_date, end_date } = getShowDto;

    let baseQuery: any = {
      relations: ['user', 'files', 'products', 'skus'],
      skip: offset,
      take: limit,
    };

    let where: any = {};
    if (user_id) {
      where.user = user_id;
    }
    if (start_date && end_date) {
      where.date = Between(start_date, end_date);
    }

    if (Object.keys(where).length > 0) {
      baseQuery.where = where;
    }

    return this.showRepository.find(baseQuery);
  }

  // todo add nested route structure for these association lookups
  async findOne(id: string) {
    const show = await this.showRepository.findOne({
      where: { id: id },
      relations: ['user', 'files', 'products', 'skus'],
    });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    return show;
  }

  async create(createShowDto: CreateShowDto): Promise<Show> {
    const user = await this.userRepository.findOne(createShowDto.user_id);
    if (!user) {
      throw new NotFoundException(`User #${createShowDto.user_id} not found`);
    }
    const video_file = await this.filesService.findOne(
      createShowDto.video_id,
      'Show Preview Video',
    );
    video_file.tag = 'video';
    this.fileRepository.save(video_file);
    const photo_file = await this.filesService.findOne(
      createShowDto.photo_id,
      'Show Preview Photo',
    );
    photo_file.tag = 'photo';
    this.fileRepository.save(photo_file);
    const show = this.showRepository.create({
      user: user,
      files: [video_file, photo_file],
      ...createShowDto,
    });
    return this.showRepository.save(show);
  }

  async update(id: string, updateShowDto: UpdateShowDto) {
    const show = await this.showRepository.preload({
      id: id,
      ...updateShowDto,
    });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    // should prob move into Skus Service
    if (updateShowDto.start) {
      const skus = await this.skuRepository.find({ where: { show: +id } });
      // probably need error handling to save failed records and skip
      skus.map(sku => this.stripeService.activateStripeSku(sku));
    } else if (updateShowDto.end) {
      const skus = await this.skuRepository.find({ where: { show: +id } });
      // probably need error handling to save failed records and skip
      skus.map(sku => this.stripeService.deactivateStripeSku(sku));
    }
    return this.showRepository.save(show);
  }

  async remove(id: string) {
    const show = await this.findOne(id);
    return this.showRepository.remove(show);
  }
}
