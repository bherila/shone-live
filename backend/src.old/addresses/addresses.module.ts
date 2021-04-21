import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserAddress } from "../user-addresses/user-address.entity";
import { User } from "../users/entities/user.entity";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";
import { Address } from "./entities/address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Address, UserAddress, User])],
  providers: [AddressesService],
  controllers: [AddressesController],
  exports: [AddressesService],
})
export class AddressesModule {}
