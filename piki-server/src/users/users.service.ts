import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "crypto";
import { Repository } from "typeorm";

import PostgresErrorCode from "../common/database/postgres-error-code.enum";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { UniquenessConstraintException } from "../common/exceptions/uniqueness-constraint-violation.exception";
import { CreateFileDto } from "../files/dto/create-file.dto";
import { FilesService } from "../files/files.service";
import { StripeService } from "../stripe/stripe.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users: User[]; // TODO, get rid of this, not sure what it's for

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(StripeService) // TODO: look at all these inject with stripe service in various files, I don't understand why it's needed...shouldn't be
    private readonly stripeService: StripeService,
    private readonly filesService: FilesService
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      relations: ["shows", "products", "files"],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id: id }
      // relations: ['shows', 'products', 'files'],
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // todo: figure out how to add this kind of validation into the DTO
    if (!createUserDto.email && !createUserDto.phone) {
      throw new UnprocessableEntityException(
        `you must create a user with at least EITHER an email OR a password`
      );
    }
    // todo add call back to stripe on cronjob for the failed ones
    let id: string;
    try {
      const stripeCustomer = await this.stripeService.createStripeCustomer(
        createUserDto
      );
      id = stripeCustomer.id;
    } catch (error) {
      // todo review docs and add error handling to get this case to sentry
      // for our cronjob we can just search where the id had the prefix
      id = `temp_user_id_${crypto.randomBytes(20).toString("hex")}`;
    }

    const user = this.userRepository.create({
      ...createUserDto,
      id: id
    });
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error && error.code === PostgresErrorCode.unique_violation) {
        throw new UniquenessConstraintException(`${error.detail}`);
      }
      if (error && error.code === PostgresErrorCode.not_null_violation) {
        throw new UnprocessableEntityException(
          `some required fields are null: ${error.detail}`
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // TODO add in lookup for associations like in coffees.service.ts
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto
        //todo add associations
      });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      this.stripeService.updateStripeCustomer(updateUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      // prevent updating to an existing email
      if (error?.code === PostgresErrorCode.unique_violation) {
        throw new UniquenessConstraintException(`${error.detail}`);
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async addAvatar(
    createFileDto: CreateFileDto,
    dataBuffer: Buffer,
    filename: string
  ) {
    const { user_id } = createFileDto;
    const user = await this.userRepository.findOne(user_id);
    if (user.avatar) {
      await this.userRepository.update(user_id, {
        ...user,
        avatar: null
      });
      await this.filesService.deletePublicFile(user.avatar.id);
    }
    const avatar = await this.filesService.uploadFile(
      createFileDto,
      dataBuffer,
      filename
    );
    await this.userRepository.update(user_id, {
      ...user,
      avatar
    });
    return avatar;
  }

  async deleteAvatar(userId: string) {
    const user = await this.userRepository.findOne(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await this.userRepository.update(userId, {
        ...user,
        avatar: null
      });
      await this.filesService.deletePublicFile(fileId);
    }
  }
}
