import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import {
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";

import { CreateFileDto } from "./dto/create-file.dto";
import { FilesService } from "./files.service";
import { CreateFileResponse } from "./responses/create-file.response";

@Controller("files")
// this is to run the @Exclude() call on the _id column
// in order to filter it from from the response
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: `any file type can be uploaded at this endpoint
    there is no validation on the type of the file
    files may either be publicly accessible or protected`
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `uploaded file`,
    type: CreateFileResponse
  })
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  async addFile(
    @Body() CreateFileDto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<CreateFileResponse> {
    return this.filesService
      .uploadFile(CreateFileDto, file.buffer, file.originalname)
      .then(file => new CreateFileResponse(file));
  }

  @Get()
  @ApiQuery({ name: "user_id", type: String, required: false })
  findAll(@Query("user_id") user_id: string) {
    return this.filesService.findAll(user_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.filesService.findOne(id);
  }

  @Delete()
  remove(@Param("user_id") user_id: string, @Param("file_id") file_id: string) {
    return this.filesService.remove(user_id, file_id);
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
