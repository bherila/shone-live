import {
  Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {
  ApiConsumes, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { CreatePrivateFileDto } from './dto/create-private-file.dto';
import { PrivateFilesService } from './private-files.service';
import {
  AwsS3PrivateFileCreateResponse,
} from './responses/aws-s3-file-private.create';

@ApiTags('private-files')
@Controller('private-files')
export class PrivateFilesController {
  constructor(private readonly privateFilesService: PrivateFilesService) {}

  @ApiOperation({
    summary: `a user can upload any file,
      this is a private file so can only get access through the user get,
      non-users cannot access these files`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `uploaded file`,
    type: AwsS3PrivateFileCreateResponse,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async addPrivateFile(
    @Body() CreatePrivateFileDto: CreatePrivateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.privateFilesService.uploadPrivateFile(
      CreatePrivateFileDto,
      file.buffer,
      file.originalname,
    );
  }

  // todo: refactor below from user controller for this case
  /*
  // todo add query params
  // and see other chg you made for how to compose the query object
  @ApiOperation({ summary: `get all the files using query params` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `all the files uploaded by this user`,
    type: AwsS3PrivateFileCreateResponse,
    isArray: true,
  })
  @Get(':userId/files')
  async getAllPrivateFiles(@Param('userId') userId: string) {
    return this.privateFilesService.getAllPrivateFiles(userId);
  }

  @ApiOperation({
    summary: `delete a file,
      (only the user who created the file can delete it)`,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: `deleted file`,
  })
  @Delete(':userId/files/:fileId')
  @ApiConsumes('application/octet-stream')
  @HttpCode(204)
  async deleteFile(
    @Param('userId') userId: string,
    @Param('fileId') fileId: number,
  ) {
    // return this.privateFilesService.deleteAvatar(userId);
    return this.privateFilesService.deletePrivateFile(userId, fileId);
  }
  */
}
