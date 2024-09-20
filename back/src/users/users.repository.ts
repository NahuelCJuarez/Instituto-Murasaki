import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";
import { Role } from "src/enums/roles.enum";
// import { DiscordUser } from "./users.discord.entity";


@Injectable()
export class UsersRepository{
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async getUsers(page?: number, limit?: number){
        if (page < 1 || limit < 1) {
            throw new BadRequestException('La pagina y el limite tienen que ser mayores a 0');
          }

        if (!page && !limit) {
            const allUsers = await this.usersRepository.find();
            return allUsers;
        }
        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find({
            // where: { isDeleted: false, role: Role.Alumno},
            relations: {discordUser: true},
            take: limit,
            skip: skip,
        });
        
        return users
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
            where: {email, isDeleted: false},
            relations: {discordUser: true},
        })
        return user;
    }

    async createUser(user: Partial<User>): Promise<Partial<User>>{
        const newUser = await this.usersRepository.save(user);

        const dbUser = await this.usersRepository.findOneBy({id: newUser.id});

        const {password, ...userNoPassword } = dbUser;

        return userNoPassword;
    }

    async updateUser(id: string, data: Partial<User>){
        const foundUser = await this.usersRepository.findOneBy({ id });
    
    if (!foundUser) throw new NotFoundException('No se encontró al usuario');

    await this.usersRepository.update(id, data);

    const updatedUser = await this.usersRepository.findOneBy({ id });
    return updatedUser;
    }

    async updateAllDiscordUsers(){}

    async updateDiscordUser(){}
}