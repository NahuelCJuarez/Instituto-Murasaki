import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { DiscordUser } from 'src/users/users.discord.entity';
import { DiscordUserRepository } from 'src/users/discord.repository';

@Module({
  imports: [
    PassportModule, ConfigModule,TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([DiscordUser])
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository, DiscordUserRepository]
})
export class AuthModule {}
