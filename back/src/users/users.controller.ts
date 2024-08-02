import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    getUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
        if (!page || !limit) return this.usersService.getUsers();

        return this.usersService.getUsers(page, limit);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id);
    }

    
}
