import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('signup')
    async signUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }

    @Post('signin')
    async signIn(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials;
        return this.authService.signIn(email, password);
    }

    @Get('discord/callback')
    async discordCallback(@Query('code') code: string, @Query('state') userId: string) {
        if (code) {
            return this.authService.discordCallback(code, userId);
        }
        throw new Error('No se recibio el codigo de autenticacion');
    }
}
