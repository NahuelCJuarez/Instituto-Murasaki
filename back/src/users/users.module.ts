import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DiscordUserRepository } from './discord.repository';
import { DiscordUser } from './users.discord.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([DiscordUser])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DiscordUserRepository]
})
export class UsersModule {}
