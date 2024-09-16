import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';
import { log } from 'console';
import { DiscordUserRepository } from 'src/users/discord.repository';
import { DiscordUser } from 'src/users/users.discord.entity';
dotenvConfig({ path: '.env.development' });

@Injectable()
export class AuthService {
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(user: CreateUserDto){
        const { email, password, name, country, phoneNumber, birthDate } = user;

        const foundedUser = await this.usersService.getUserByEmail(email);

        if (foundedUser) throw new BadRequestException('El correo ya esta en uso');

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await this.usersService.createUser({
            ...user,
            password: hashedPassword,
        });
        return createdUser;
    }

    async signIn(email: string, password: string){
        if(!email || !password) return 'Se requiere el email y la contraseña';

        const user = await this.usersService.getUserByEmail(email);

        if(!user) throw new UnauthorizedException('Credenciales invalidas');

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) throw new UnauthorizedException('Credenciales invalidas');

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = this.jwtService.sign(payload);

        return {
            message: 'Usuario logueado',
            token,
            userId: user.id,
            discordUser: user.discordUser,
        };
    }

    async discordCallback(code: string, userId: string) {
        const params = new URLSearchParams();
        params.append('client_id', process.env.client_id);
        params.append('client_secret', process.env.client_secret);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', 'http://localhost:3000/auth/discord/callback');
      
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      
        const accessToken = tokenResponse.data.access_token;
      
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      
        const newDcUser = await this.usersService.createDcUser(userResponse.data, userId);
        console.log(newDcUser);
        
        const discordUser = {discordUser: userResponse.data}

        const completeUser = await this.usersService.updateUser(userId, discordUser)
      
        return completeUser;
      }
      
}
