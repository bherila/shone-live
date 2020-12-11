import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Show } from '../shows/entities/show.entity';
import { User } from '../users/entities/user.entity';
import { CreateSimpleProductDto } from './dto/create-simple-product.dto';
import { UpdateSimpleProductDto } from './dto/update-simple-product.dto';
import { SimpleProduct } from './entities/simple-product.entity';
import {
  CreateSimpleProductResponse,
} from './responses/create-simple-product.response';

@Injectable()
export class SimpleProductsService {
  constructor(
    @InjectRepository(SimpleProduct)
    private readonly simpleProductRepository: Repository<SimpleProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(
    createSimpleProductDto: CreateSimpleProductDto,
  ): Promise<CreateSimpleProductResponse> {
    // move into services and call the service method for one liner
    const user = await this.userRepository.findOne(
      createSimpleProductDto.user_id,
    );
    if (!user) {
      throw new NotFoundException(
        `User #${createSimpleProductDto.user_id} not found`,
      );
    }
    const show = await this.showRepository.findOne(
      createSimpleProductDto.show_id,
    );
    if (!show) {
      throw new NotFoundException(
        `Show #${createSimpleProductDto.show_id} not found`,
      );
    }
    const file = await this.fileRepository.findOne({
      where: { id: createSimpleProductDto.image_id },
    });
    if (!file) {
      throw new NotFoundException(
        `Image #${createSimpleProductDto.image_id} not found`,
      );
    }
    const simpleProduct = this.simpleProductRepository.create({
      user: user,
      show: show,
      files: [file],
      ...createSimpleProductDto,
    });
    const savedSimpleProduct = await this.simpleProductRepository.save(
      simpleProduct,
    );
    return new CreateSimpleProductResponse(savedSimpleProduct);
  }

  findAll() {
    return `This action returns all simpleProducts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} simpleProduct`;
  }

  update(id: string, updateSimpleProductDto: UpdateSimpleProductDto) {
    return `This action updates a #${id} simpleProduct`;
  }

  remove(id: string) {
    return `This action removes a #${id} simpleProduct`;
  }
}
