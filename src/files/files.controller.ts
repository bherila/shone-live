import { diskStorage } from 'multer';

import {
  Body, Controller, Delete, Get, Param, Post, Query, Res, UploadedFile,
  UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CreateFileDto } from './dto/create-file.dto';
import { FilesService } from './files.service';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';

// todo: update file uploader to save url (filepath for now in this dir)
// todo: add a get files endpoint with query params
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('type/:type/model/:model')
  findAll(
    @Query() paginationQuery,
    @Param('type') type: string,
    @Param('model') model: string,
  ) {
    const { limit, offset } = paginationQuery;
    return `todo: make this return records by type (eg photo, video), model (eg product) and by pagination`;
  }

  // todo: implement get by ':type/:model/:id'

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    // todo at least use service to check if filename is valid
    // todo: add error handling
    return res.sendFile(image, { root: './files' });
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file,
    @Body() createFileDto: CreateFileDto,
  ) {
    const fileNames = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return this.filesService.create(createFileDto, fileNames);
  }

  @Post('images')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files,
    @Body() createFileDto: CreateFileDto,
  ) {
    const response = [];
    files.forEach(file => {
      const fileNames = {
        originalname: file.originalname,
        filename: file.filename,
      };
      this.filesService.create(createFileDto, fileNames);
      response.push(fileNames);
    });
    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
