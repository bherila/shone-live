import { Between, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
    private readonly stripeService: StripeService,
  ) {}

  // todo add nested route structure for these association lookups
  // EG todo find all by user id (user/{id}/shows)
  // todo for findall on all objects maybe don't return nested
  // todo need better filters and query params for all too
  findAll(getShowDto: ShowsQueryDto) {
    const { limit, offset, userId, startDate, endDate } = getShowDto;

    // todo figure out how to filter date range with user ID
    // for now it will just take userId first and ignore date range if sent
    // due to ordering of if statements
    if (userId) {
      return this.showRepository.find({
        where: { user: userId },
        relations: ['user', 'products', 'files', 'skus'],
        skip: offset,
        take: limit,
      });
    }
    if (startDate && endDate) {
      return this.showRepository.find({
        where: {
          date: Between(startDate, endDate),
        },
        relations: ['user', 'products', 'files', 'skus'],
        skip: offset,
        take: limit,
      });
    }
    return this.showRepository.find({
      relations: ['user', 'products', 'files', 'skus'],
      skip: offset,
      take: limit,
    });
  }

  // todo add nested route structure for these association lookups
  async findOne(id: string) {
    const show = await this.showRepository.findOne(id, {
      relations: ['user', 'products', 'files', 'skus'],
    });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    return show;
  }

  async create(createShowDto: CreateShowDto) {
    const show = this.showRepository.create(createShowDto);
    show.user = await this.userRepository.findOne(createShowDto.userId);
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
