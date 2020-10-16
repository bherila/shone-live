import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgres-error-code.enum';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  private readonly users: User[]; // TODO, get rid of this, not sure what it's for

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(StripeService) // TODO: look at all these inject with stripe service in various files, I don't understand why it's needed...shouldn't be
    private readonly stripeService: StripeService,
    private authService: AuthService,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      relations: ['shows', 'products', 'files'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['shows', 'products', 'files'],
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // find out how to transform dto more efficiently
    const stripeCustomer = await this.stripeService.createStripeCustomer(
      createUserDto,
    );

    try {
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        id: stripeCustomer.id,
      });
      const savedUser = await this.userRepository.save(user);
      return this.authService.login(savedUser); // todo: should have a better name maybe than login? since used for create...
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          `${error.detail}`, // TODO: clean this up as there are multiple uniques at least saw username, email, phone...need helpful error for client
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // TODO add in lookup for associations like in coffees.service.ts
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto,
        //todo add associations
      });
      if (user && updateUserDto.password) {
        user.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      this.stripeService.updateStripeCustomer(updateUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      // prevent updating to an existing email (also refactor to have separate username and email!)
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
