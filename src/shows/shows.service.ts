import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Show } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { User } from 'src/users/entities/user.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { ShowsQueryDto } from './dto/shows-query.dto';

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
    const { limit, offset, userId } = getShowDto;
    if (userId) {
      return this.showRepository.find({
        where: { user: userId },
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
