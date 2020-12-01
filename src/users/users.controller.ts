import { Express } from 'express';

import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post,
  Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {
  ApiConsumes, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { User } from './entities/user.entity';
import {
  AwsS3PrivateFileCreateResponse,
} from './responses/aws-s3-file-private.create';
import { AwsS3FileCreateResponse } from './responses/aws-s3-file.create';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: `returns all users` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: User,
    isArray: true,
  })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<User[]> {
    return await this.usersService.findAll(paginationQuery);
  }

  @ApiOperation({ summary: `returns a single user by their id` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: User,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({ summary: `creates a new user given unique fields` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created user and any associated addresses passed`,
    type: User,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  // todo: should we make username immutable?
  @ApiOperation({ summary: `updates a user, eg their address` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `updated user`,
    type: User,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: `hard deletes a user, cascading...probably should never use in
    production; will switch to soft delete`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `deleted user`,
    type: User,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }

  @ApiOperation({
    summary: `adds the single profile image for the user
  will override if a new avatar image uploaded`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `uploaded avatar image`,
    type: AwsS3FileCreateResponse,
  })
  // todo get the file part into the docs for these
  // the file part is missing in the request body
  @Post('avatar')
  @UseInterceptors(FileInterceptor('image'))
  async addAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.usersService.addAvatar(
      uploadFileDto.user_id,
      file.buffer,
      file.originalname,
    );
  }

  @ApiOperation({
    summary: `removes the single profile image for the user
  (profile image is optional)`,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: `deleted avatar image`,
  })
  @Delete(':userId/avatar')
  @HttpCode(204)
  async deleteAvatar(@Param('userId') userId: string) {
    return this.usersService.deleteAvatar(userId);
  }

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
  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async addPrivateFile(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
      uploadFileDto.user_id,
      file.buffer,
      file.originalname,
    );
  }

  @ApiOperation({ summary: `get all the files uploaded by a user` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `all the files uploaded by this user`,
    type: AwsS3PrivateFileCreateResponse,
    isArray: true,
  })
  @Get(':userId/files')
  async getAllPrivateFiles(@Param('userId') userId: string) {
    return this.usersService.getAllPrivateFiles(userId);
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
    // return this.usersService.deleteAvatar(userId);
    return this.usersService.deletePrivateFile(userId, fileId);
  }
}
