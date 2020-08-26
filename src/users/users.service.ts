import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgres-error-code.enum';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.userRepository.find({
            relations: ['shows', 'products'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: {username: username},
            relations: ['shows', 'products']
        });
        if (!user) {
            throw new NotFoundException(`User with username: ${username} not found`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        try {
            const user = this.userRepository.create({
                ...createUserDto,
                password: hashedPassword,
            });
            return await this.userRepository.save(user);
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        // TODO add in lookup for associations like in coffees.service.ts
        try {
            const user = await this.userRepository.preload({
                id: +id,
                ...updateUserDto,
                //todo add associations
            })
            if (user && updateUserDto.password) {
                user.password = await bcrypt.hash(updateUserDto.password, 10);
            }
            if (!user) {
                throw new NotFoundException(`User #${id} not found`);
            }
            return this.userRepository.save(user);
        } catch (error) { // prevent updating to an existing email (also refactor to have separate username and email!)
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        return this.userRepository.remove(user);
    }
}
