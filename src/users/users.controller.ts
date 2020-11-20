import { Express } from 'express';

import {
  Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query,
  UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.usersService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('image'))
  async addAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.usersService.addAvatar(
      uploadFileDto.userId,
      file.buffer,
      file.originalname,
    );
  }

  @Delete(':userId/avatar')
  @HttpCode(204)
  async deleteAvatar(@Param('userId') userId: string) {
    return this.usersService.deleteAvatar(userId);
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
      uploadFileDto.userId,
      file.buffer,
      file.originalname,
    );
  }

  @Get(':userId/files')
  async getAllPrivateFiles(@Param('userId') userId: string) {
    return this.usersService.getAllPrivateFiles(userId);
  }

  @Delete(':userId/files/:fileId')
  @HttpCode(204)
  async deleteFile(
    @Param('userId') userId: string,
    @Param('fileId') fileId: number,
  ) {
    // return this.usersService.deleteAvatar(userId);
    return this.usersService.deletePrivateFile(userId, fileId);
  }
}
