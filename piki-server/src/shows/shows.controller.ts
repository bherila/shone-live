import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SimpleProductsService } from "../simple-products/simple-products.service";

import { CreateSimpleProductResponse } from "../simple-products/responses/create-simple-product.response";
import { AddSimpleProductsToShowDto } from "./dto/add-simple-products-to-show.dto";
import { CreateShowDto } from "./dto/create-show.dto";
import { ShowsQueryDto } from "./dto/shows-query.dto";
import { UpdateShowDto } from "./dto/update-show.dto";
import { Show } from "./entities/show.entity";
import { CreateShowResponse } from "./responses/create-show.response";
import { ShowsService } from "./shows.service";
import { SimpleProduct } from "../simple-products/entities/simple-product.entity";

@Controller("shows")
@UseInterceptors(ClassSerializerInterceptor) // needed to run @Exclude()
@ApiTags("shows")
// @UseGuards(JwtAuthGuard) // TODO check this,
// but these should show wherever there's auth gaurd on route in swatgger docs
// and then we should add this everywhere we add gaurd
// @ApiBearerAuth('JWT')
export class ShowsController {
  constructor(
    private readonly showService: ShowsService,
    private readonly simpleProductsService: SimpleProductsService
  ) {}

  @ApiOperation({
    summary: `returns all shows
  filtered by optional query parameters`
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: Show,
    isArray: true
  })
  @Get()
  async findAll(
    @Query() showsQueryDto: ShowsQueryDto
  ): Promise<CreateShowResponse[]> {
    return this.showService
      .findAll(showsQueryDto, ["user", "files", "simpleProducts"])
      .then(shows => {
        return shows.map(show => new CreateShowResponse(show));
      });
  }

  @ApiOperation({ summary: `returns a single show by its id` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: Show
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CreateShowResponse> {
    return this.showService
      .findOne(id, ["user", "files", "simpleProducts"])
      .then(show => {
        return new CreateShowResponse(show);
      });
  }

  @ApiOperation({ summary: `creates a new show` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created show`,
    type: CreateShowResponse
  })
  @Post()
  async create(
    @Body() createShowDto: CreateShowDto
  ): Promise<CreateShowResponse> {
    return this.showService.create(createShowDto).then(show => {
      return new CreateShowResponse(show);
    });
  }

  @ApiOperation({
    summary: `updates a show, eg the start date/time
    although request body listed as required, feilds are just example fields
    any subset can be sent (they aren't all needed)`
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `updated show`,
    type: Show
  })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateShowDto: UpdateShowDto
  ): Promise<Show> {
    return this.showService.update(id, updateShowDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Show> {
    return this.showService.remove(id);
  }

  @ApiOperation({
    summary: `bulk updates simpleProducts
  by adding this show id to all of them`
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `successfully associated simpleProducts with show`,
    isArray: true,
    type: CreateSimpleProductResponse
  })
  @Post(":showId/add_simple_products")
  async addSimpleProducts(
    @Param("showId") showId: string,
    @Body() addSimpleProductsToShowDto: AddSimpleProductsToShowDto
  ): Promise<CreateSimpleProductResponse[]> {
    return this.simpleProductsService
      .bulkUpdate(
        "showId",
        showId,
        addSimpleProductsToShowDto.simple_product_ids
      )
      .then((simpleProducts: Promise<SimpleProduct>[]) => {
        return Promise.all(simpleProducts).then(simpleProducts => {
          return simpleProducts.map(simpleProduct => {
            return new CreateSimpleProductResponse(simpleProduct);
          });
        });
      });
  }
}
