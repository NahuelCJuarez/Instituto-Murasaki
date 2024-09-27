import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.entity';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    getUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
        if (!page || !limit) return this.usersService.getUsers();

        return this.usersService.getUsers(page, limit);
    }

    @Get('maestros')
    getMaestros(@Query('page') page?: number, @Query('limit') limit?: number) {
        if (!page || !limit) return this.usersService.getMaestros();

        return this.usersService.getUsers(page, limit);
    }

    @Get('deleted')
    getDeleted(@Query('page') page?: number, @Query('limit') limit?: number) {
        if (!page || !limit) return this.usersService.getDeleted();

        return this.usersService.getDeleted(page, limit);
    }

    @Get('search')
    async searchUsers(@Query('term') term: string) {
        return this.usersService.searchUsers(term);
      }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id);
    }

    @Put('update-discord-info')
    updateDiscordInfoForAllUsers() {
        return this.usersService.updateDiscordInfoForAllUsers();
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
        return this.usersService.updateUser(id, user);
    }
}
