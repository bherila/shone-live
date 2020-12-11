import { S3 } from 'aws-sdk';
import { ObjService } from 'src/common/helpers/object.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private readonly configService: ConfigService,
    private readonly objService: ObjService,
  ) {}

  async uploadFile(
    createFileDto: CreateFileDto,
    dataBuffer: Buffer,
    filename: string,
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const saveData = this.objService.filteredNoNulls(
      Object.assign({}, createFileDto),
      ['type', 'product_id', 'sku_id', 'show_id'],
    );
    saveData['key'] = uploadResult.Key;
    saveData['user'] = { id: createFileDto.user_id };

    const newFile = this.filesRepository.create(saveData);
    await this.filesRepository.save(newFile);
    return newFile;
  }

  public async generatePresignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key,
      Expires: 86400,
    });
  }

  async deleteFile(userId: string, fileId: number) {
    const file = await this.filesRepository.findOne(
      { id: fileId },
      { relations: ['user'] },
    );
    if (file.user.id !== userId) {
      throw new UnauthorizedException(
        `User #${userId} does not have permission to delete file #${fileId}`,
      );
    }
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.filesRepository.delete(fileId);
  }
}
