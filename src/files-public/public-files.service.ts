import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { PublicFile } from './entities/public-file.entity';

// source
// https://wanago.io/2020/08/03/api-nestjs-uploading-public-files-to-amazon-s3/

@Injectable()
export class PublicFilesService {
  constructor(
    @InjectRepository(PublicFile)
    private S3FilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadS3File(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.S3FilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.S3FilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(fileId: number) {
    const file = await this.S3FilesRepository.findOne({ id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.S3FilesRepository.delete(fileId);
  }
}
