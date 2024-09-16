import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscordUser } from "./users.discord.entity";
import { Repository } from "typeorm";
import { UsersRepository } from "./users.repository";
import { User } from "./users.entity";
import { CreateDiscordUserDto } from "./discord.dto";

@Injectable()
export class DiscordUserRepository{
    constructor (
        @InjectRepository(DiscordUser) private discordUsersRepository: Repository<DiscordUser>,
        private usersRepository: UsersRepository
    ) {}

    async createDcUser(data: CreateDiscordUserDto, userId: string){
        const userDb = await this.usersRepository.getUser(userId);
        const name = data.global_name === null ? data.username : data.global_name;

        const newUser = new DiscordUser();
        newUser.user = userDb
        newUser.id = data.id
        newUser.username = name
        newUser.discriminator = data.discriminator
        newUser.avatar = data.avatar

        const discordUser = await this.discordUsersRepository.save(newUser);

        const updatedUser = await this.usersRepository.updateUser(userId, {discordUser})
        return updatedUser;
    }
}