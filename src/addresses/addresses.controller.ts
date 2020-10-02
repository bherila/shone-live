import { Body, Controller, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
    constructor(private readonly addressService: AddressesService) { }

    @Post()
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.addressService.create(createAddressDto);
    }
}
