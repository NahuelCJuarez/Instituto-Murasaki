import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { DiscordUserRepository } from './discord.repository';
import { CreateDiscordUserDto } from './discord.dto';

@Injectable()
export class UsersService {
    constructor (
        private readonly usersRepository: UsersRepository,
        private readonly discordUsersRepository: DiscordUserRepository
    ){}

    getUsers(page?: number, limit?: number) {
        return this.usersRepository.getUsers(page, limit);
    }

    getUser(id: string) {
        return this.usersRepository.getUser(id);
    }

    getUserByEmail(email: string) {
        return this.usersRepository.getUserByEmail(email);
    }

    createUser(user: CreateUserDto) {
        return this.usersRepository.createUser(user);
    }

    createDcUser(user: CreateDiscordUserDto, id: string){
        return this.discordUsersRepository.createDcUser(user, id);
    }

    updateUser(id: string, user: Partial<User>) {
        return this.usersRepository.updateUser(id, user);
    }

    updateAllDiscordUsers() {
        return this.usersRepository.updateAllDiscordUsers();
    }

    updateDiscordUser() {
        return this.usersRepository.updateDiscordUser();
    }

}
