import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";

@Injectable()
export class UsersRepository{
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async getUsers(page?: number, limit?: number){
        if (page < 1 || limit < 1) {
            throw new BadRequestException('La pagina y el limite tienen que ser mayores a 0');
          }

        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find({
            where: { isDeleted: false },
            take: limit,
            skip: skip,
        });
        
    }

    async getUser(id: string){
        const user = await this.usersRepository.findOne({
            where: {id, isDeleted: false},
            relations: {discordUser: true}
        })
        if(!user) throw new NotFoundException('No se encontro ningun usuario con esa id');
        const {password, ...userNoPassword } = user;
        
        return userNoPassword;
    }

    async getUserByEmail(email: string){
        const user = await this.usersRepository.findOne({
            where: {email, isDeleted: false}
        })
        if(!user) throw new NotFoundException('No se encontro ningun usuario con ese correo');

        return user;
    }

    async createUser(user: Partial<User>): Promise<Partial<User>>{
        const newUser = await this.usersRepository.save(user);

        const dbUser = await this.usersRepository.findOneBy({id: newUser.id});

        const {password, ...userNoPassword } = dbUser;

        return userNoPassword;
    }

    async updateUser(){}

    async updateAllDiscordUsers(){}

    async updateDiscordUser(){}
}