import { Role } from "src/roles/roles.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users',
})
export class User {
    /**
     * @description ID de identificacion
     * @example 'd290f1ee-6c54-4b01-90e6-d701748f0851'
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
   * @description El Email del usuario
   * @example 'user@example.com'
   */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    /**
    * @description El nombre del usuario
    * @example 'Pedro'
    */
    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    name: string;

    /**
     * @description El apellido del usuario
     * @example 'Gomez'
     */
    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    lastName: string;

    /**
     * @description La contraseña del usuario
     * @example 'strongPassword123!'
     */
    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    password: string;

    /**
     * @description El pais de origen del usuario
     * @example 'Argentina'
     */
    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    country: string;

    /**
     * @description Fecha de nacimiento
     * @example '30-09-1992'
     */
    @Column({
        nullable: false
    })
    birthDate: Date

    /**
     * @description Numero de telefono
     * @example '543334567894'
     */
    @Column({
        type: 'number',
        nullable: false
    })
    phoneNumber: number

    /**
     * @description Nivel de conocimiento
     * @example 'N6-1'
     */
    @Column({
        type: 'varchar',
        length: 4,
        nullable: true,
    })
    level: string

    /**
     * @description Estado del pago del curso
     * @example 'Pago'
     */
    @Column({
        default: false
    })
    status: boolean

    /**
     * @description Rol del usuario
     * @example 'Admin'
     */
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User,
    })
    role: Role;

    @Column({
        type: 'varchar',
        length: 300,
        nullable: true,
        default: 'https://cdn-icons-png.flaticon.com/512/6676/6676016.png',
    })
    profilePicture: string;

    /**
     * @description Datos de discord
     */
    @OneToOne(() => DiscordUser, (discordUser) => discordUser.user)
    discordUser: DiscordUser

    /**
    * @description Estado eliminacion, en false indica que existe
    * @example 'false'
    */
    @Column({ default: false })
    isDeleted: boolean;

}

export class DiscordUser {
    /**
     * @description Usuario del instituto
     */
    @OneToOne(() => User, (user) => user.discordUser)
    user: User

    /**
     * @description Id del usuario en Discord
     */
    @Column()
    id: string

    /**
     * @description Nombre de usuario en Discord
     */
    @Column()
    username: string

    /**
     * @description Hashtag diferenciador de usuarios con el mismo nombre
     */
    @Column()
    discriminator: string

    /**
     * @description Imagen de perfil en discord
     */
    @Column()
    avatar: string
}