import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { Address } from "./entities/address.entity";

@ApiTags("addresses")
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT')
@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  // TODO: see if we need this controller
  // since seems we use stripe address for everything
  // TODO figure out how to just return the address
  // and not all the associations
  // and have the type also just the address
  @ApiOperation({ summary: `creates a new address` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created an address independent of stripe`,
    type: Address
  })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }
}
