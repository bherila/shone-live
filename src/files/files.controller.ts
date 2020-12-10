import {
  Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {
  ApiConsumes, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { CreateFileDto } from './dto/create-file.dto';
import { FilesService } from './files.service';
import { AwsS3FileCreateResponse } from './responses/file.create';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: `a user can upload any file,
      this is a private file so can only get access through the user get,
      non-users cannot access these files`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `uploaded file`,
    type: AwsS3FileCreateResponse,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async addFile(
    @Body() CreateFileDto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(
      CreateFileDto,
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
    type: AwsS3FileCreateResponse,
    isArray: true,
  })
  @Get(':userId/files')
  async getAllFiles(@Param('userId') userId: string) {
    return this.filesService.getAllFiles(userId);
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
    // return this.filesService.deleteAvatar(userId);
    return this.filesService.deleteFile(userId, fileId);
  }
  */
}
