import { Controller, Post, Body, Query, Param, Get, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
        const users = await this.usersService.findAll(paginationQuery);
        // todo move sanitization to service (can have common function)
        const sanitizedUsers = users.map(user => { delete user.password; return user; });
        return sanitizedUsers;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        // todo move sanitization to service (can have common function)
        const { password, ...result } = user;
        return result;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        // todo move sanitization to service (can have common function)
        const { password, ...result } = user;
        return result;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        const { password, ...result } = user;
        return result;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.usersService.remove(id);
        const { password, ...result } = user;
        return result;
    }
}
