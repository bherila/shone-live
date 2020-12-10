import { Between, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
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
  ) {}

  // todo add nested route structure for these association lookups
  // EG todo find all by user id (user/{id}/shows)
  // todo for findall on all objects maybe don't return nested
  // todo need better filters and query params for all too
  findAll(getShowDto: ShowsQueryDto) {
    const { limit, offset, userId, startDate, endDate } = getShowDto;

    let baseQuery: any = {
      relations: ['user', 'files', 'products', 'skus'],
      skip: offset,
      take: limit,
    };

    let where: any = {};
    if (userId) {
      where.user = userId;
    }
    if (startDate && endDate) {
      where.date = Between(startDate, endDate);
    }

    if (Object.keys(where).length > 0) {
      baseQuery.where = where;
    }

    return this.showRepository.find(baseQuery);
  }

  // todo add nested route structure for these association lookups
  async findOne(id: string) {
    const show = await this.showRepository.findOne(id, {
      relations: ['user', 'files', 'products', 'skus'],
    });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    return show;
  }

  async create(createShowDto: CreateShowDto) {
    const show = this.showRepository.create(createShowDto);
    const preview = await this.fileRepository.findOne(createShowDto.previewId);
    if (preview) {
      preview.show = show;
      this.fileRepository.save(preview);
    }
    show.user = await this.userRepository.findOne(createShowDto.user_id);
    return this.showRepository.save(show);
  }

  async update(id: string, updateShowDto: UpdateShowDto) {
    const show = await this.showRepository.preload({
      id: +id,
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
