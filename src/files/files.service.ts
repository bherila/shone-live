import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Product } from 'src/products/entities/product.entity';
const fs = require('fs');

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createFileDto: CreateFileDto, fileNames) {
        const file = this.fileRepository.create({
            name: fileNames.filename,
            ...createFileDto,
        });
        file.user = await this.userRepository.findOne(createFileDto.userId);

        if (createFileDto.productId) {
            file.product = await this.productRepository.findOne(createFileDto.productId);
        }
        if (createFileDto.showId) {
            file.show = await this.showRepository.findOne(createFileDto.showId);
        }
        return this.fileRepository.save(file);
    }

    async remove(id: string) {
        const file = await this.fileRepository.findOne(id);
        if (!file) {
            throw new NotFoundException(`File with id ${id} not found`);
        }
        fs.unlink(`/Users/brettonauerbach/nestjs_official_tutorial/iluvcoffee/files/${file.name}`, (err) => {
            if (err) throw err;
          });
        return this.fileRepository.remove(file);
    }
}
