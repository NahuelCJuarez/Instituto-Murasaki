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

    getMaestros(page?: number, limit?: number) {
        return this.usersRepository.getMaestros(page, limit);
    }

    getDeleted(page?: number, limit?: number) {
        return this.usersRepository.getDeleted(page,limit)
    }
 
    getUser(id: string) {
        return this.usersRepository.getUser(id);
    }

    getUserByEmail(email: string) {
        return this.usersRepository.getUserByEmail(email);
    }

    searchUsers(term: string){
        return this.usersRepository.searchUsers(term);
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

    getDiscordUserInfo(discordId: string) {
        return this.usersRepository.getDiscordUserInfo(discordId);
    }

    updateDiscordInfoForAllUsers() {
        return this.usersRepository.updateDiscordInfoForAllUsers();
    }

}
