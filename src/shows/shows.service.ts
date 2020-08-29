import { Injectable, NotFoundException } from '@nestjs/common';
import { Show } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShowsService {
    constructor(
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // todo add nested route structure for these association lookups
    // EG todo find all by user id (user/{id}/shows)
    // todo for findall on all objects maybe don't return nested
    // todo need better filters and query params for all too
    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.showRepository.find({
            relations: ['user', 'products', 'files'],
            skip: offset,
            take: limit,
        });
    }

    // todo add nested route structure for these association lookups
    async findOne(id: string) {
        const show = await this.showRepository.findOne(id, {
            relations: ['user', 'products', 'files'],
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
            userId: updateShowDto.userId,
            ...updateShowDto,
        });
        if (!show) {
            throw new NotFoundException(`Show with id ${id} not found`);
        }
        return this.showRepository.save(show);
    }

    async remove(id: string) {
        const show = await this.findOne(id);
        return this.showRepository.remove(show);
    }
}
