import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { S3 } from "aws-sdk";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";

import { ObjService } from "../common/helpers/object.service";
import { User } from "../users/entities/user.entity";
import { CreateFileDto } from "./dto/create-file.dto";
import { File } from "./entities/file.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async uploadFile(
    createFileDto: CreateFileDto,
    dataBuffer: Buffer,
    filename: string
  ): Promise<File> {
    // AWS interaction
    // temporarily default file create to public
    const is_public = createFileDto.is_public ?? true;
    // once we remove default public
    const bucket = is_public // just put back to createFileDto.is_public
      ? "AWS_PUBLIC_BUCKET_NAME"
      : "AWS_PRIVATE_BUCKET_NAME";
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get(bucket),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`
      })
      .promise();

    // database interaction
    const user = await this.userRepository.findOne(createFileDto.user_id);
    if (!user) {
      throw new NotFoundException(`User #${createFileDto.user_id} not found`);
    }
    const saveData: File = ObjService.filteredNoNulls(
      Object.assign({}, createFileDto),
      [
        "is_public",
        "product_id",
        "show_id",
        "simple_product_id",
        "sku_id",
        "type"
      ]
    );
    saveData["url"] = uploadResult.Location;
    saveData["key"] = uploadResult.Key;
    saveData["user"] = user;
    const newFile = this.fileRepository.create(saveData);
    return await this.fileRepository.save(newFile);
  }

  public async generatePresignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise("getObject", {
      Bucket: this.configService.get("AWS_PRIVATE_BUCKET_NAME"),
      Key: key,
      Expires: 86400
    });
  }

  async findAll(user_id: string): Promise<File[]> {
    return this.fileRepository.find({ where: { user: { id: user_id } } });
  }

  async findOne(id: string, type = "File"): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: { id: id }
    });
    if (!file) {
      throw new NotFoundException(`${type} #${id} not found`);
    }
    return file;
  }

  async remove(userId: string, fileId: string) {
    const file = await this.fileRepository.findOne(
      { id: fileId },
      { relations: ["user"] }
    );
    if (file.user.id !== userId) {
      throw new UnauthorizedException(
        `User #${userId} does not have permission to delete file #${fileId}`
      );
    }
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get("AWS_PRIVATE_BUCKET_NAME"),
        Key: file.key
      })
      .promise();
    await this.fileRepository.delete(fileId);
  }

  async deletePublicFile(fileId: string) {
    const file = await this.fileRepository.findOne({ id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get("AWS_PUBLIC_BUCKET_NAME"),
        Key: file.key
      })
      .promise();
    await this.fileRepository.delete(file._id);
  }
}
