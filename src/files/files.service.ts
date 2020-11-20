import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

const fs = require('fs');

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createFileDto: CreateFileDto, fileNames) {
    const file = this.fileRepository.create({
      name: fileNames.filename,
      ...createFileDto,
    });
    file.user = await this.userRepository.findOne(createFileDto.userId);

    if (createFileDto.productId) {
      file.product = await this.productRepository.findOne(
        createFileDto.productId,
      );
    }
    return this.fileRepository.save(file);
  }

  async remove(id: string) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    fs.unlink(
      `/Users/brettonauerbach/nestjs_official_tutorial/iluvcoffee/files/${file.name}`,
      err => {
        if (err) throw err;
      },
    );
    return this.fileRepository.remove(file);
  }
}
