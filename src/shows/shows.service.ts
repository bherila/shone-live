import {
  Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository,
} from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { FilesService } from '../files/files.service';
import { Sku } from '../skus/entities/sku.entity';
import { StripeService } from '../stripe/stripe.service';
import { UsersService } from '../users/users.service';
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
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly stripeService: StripeService,
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ) {}

  // todo add nested route structure for these association lookups
  // EG todo find all by user id (user/{id}/shows)
  // todo for findall on all objects maybe don't return nested
  // todo need better filters and query params for all too
  findAll(
    getShowDto: ShowsQueryDto,
    relations: string[] = [],
  ): Promise<Show[]> {
    const { limit, offset, user_id, start, end, is_live } = getShowDto;

    let baseQuery: any = {
      relations: relations,
      skip: offset,
      take: limit,
    };

    let where1: any = {};
    let where2: any = {};
    let where3: any = {};
    if (user_id) {
      where1.user = user_id;
      where2.user = user_id;
      where3.user = user_id;
    }
    if (start && end) {
      where1.scheduled_start = Between(start, end);
      where2.start = Between(start, end);
    }
    if (start && !end) {
      where1.scheduled_start = MoreThanOrEqual(start);
      where2.start = MoreThanOrEqual(start);
    }
    if (!start && end) {
      where1.scheduled_start = LessThanOrEqual(end);
      where2.start = LessThanOrEqual(end);
    }
    if (is_live) {
      where3.start = Not(IsNull());
      where3.end = IsNull();
    }

    let where: any[] = [];
    if (Object.keys(where1).length > 0) {
      where.push(where1, where2);
    }
    if (Object.keys(where3).length > 0) {
      where.push(where3);
    }
    if (where.length > 0) {
      baseQuery.where = where;
    }

    return this.showRepository.find(baseQuery);
  }

  // todo add nested route structure for these association lookups
  async findOne(id: string, relations: string[] = []) {
    const show = await this.showRepository.findOne({
      where: { id: id },
      relations: relations,
    });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    return show;
  }

  async create(createShowDto: CreateShowDto): Promise<Show> {
    const { user_id, video_id, photo_id } = createShowDto;
    const files: any[] = [];
    const user = await this.usersService.findOne(user_id);
    if (video_id) {
      const video_file = await this.filesService.findOne(
        video_id,
        'Show Preview Video',
      );
      files.push(video_file);
      video_file.tag = 'video';
      this.fileRepository.save(video_file);
    }
    if (photo_id) {
      const photo_file = await this.filesService.findOne(
        photo_id,
        'Show Preview Photo',
      );
      files.push(photo_file);
      photo_file.tag = 'photo';
      this.fileRepository.save(photo_file);
    }

    const show = this.showRepository.create({
      ...createShowDto,
      user: user,
      scheduled: !createShowDto.start,
      files: files,
      agora_room: JSON.stringify(createShowDto.agora_room),
    });
    return this.showRepository.save(show);
  }

  async update(id: string, updateShowDto: UpdateShowDto) {
    let updateData: any = {
      id: id,
      ...updateShowDto,
    };
    if (updateShowDto.agora_room) {
      updateData['agora_room'] = JSON.stringify(updateShowDto.agora_room);
    }
    const show = await this.showRepository.preload(updateData);
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
