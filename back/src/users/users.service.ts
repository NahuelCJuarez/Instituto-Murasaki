import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor (private readonly usersRepository: UsersRepository){}

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

    updateUser() {
        return this.usersRepository.updateUser();
    }

    updateAllDiscordUsers() {
        return this.usersRepository.updateAllDiscordUsers();
    }

    updateDiscordUser() {
        return this.usersRepository.updateDiscordUser();
    }

}
