import { S3 } from 'aws-sdk';
import { ObjService } from 'src/common/helpers/object.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePrivateFileDto } from './dto/create-private-file.dto';
import { PrivateFile } from './entities/private-file.entity';

@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService,
    private readonly objService: ObjService,
  ) {}

  async uploadPrivateFile(
    createPrivateFileDto: CreatePrivateFileDto,
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
      Object.assign({}, createPrivateFileDto),
      ['type', 'product_id', 'sku_id', 'show_id'],
    );
    saveData['key'] = uploadResult.Key;
    saveData['owner'] = { id: createPrivateFileDto.user_id };

    const newFile = this.privateFilesRepository.create(saveData);
    await this.privateFilesRepository.save(newFile);
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

  async deletePrivateFile(userId: string, fileId: number) {
    const file = await this.privateFilesRepository.findOne(
      { id: fileId },
      { relations: ['owner'] },
    );
    if (file.owner.id !== userId) {
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
    await this.privateFilesRepository.delete(fileId);
  }
}
