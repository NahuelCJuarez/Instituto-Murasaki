import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

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
        };
    }

}
