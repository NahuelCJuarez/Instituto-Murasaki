import { Role } from "src/enums/roles.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiscordUser } from "./users.discord.entity";
import { Level } from "src/enums/level.enum";

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
    password?: string;

    /**
     * @description El pais de origen del usuario
     * @example 'Argentina'
     */
    @Column({
        type: 'varchar',
        length: 30
    })
    country: string;

    /**
     * @description Fecha de nacimiento
     * @example '30-09-1992'
     */
    @Column()
    birthDate: Date

    /**
     * @description Numero de telefono
     * @example '543334567894'
     */
    @Column({
        type: 'varchar',
        nullable: true
    })
    phoneNumber: string

    /**
     * @description Nivel de conocimiento
     * @example 'N6-1'
     */
    @Column({
        type: 'enum',
        enum: Level,
        default: Level.n51
    })
    level: Level

    /**
     * @description Estado del pago del curso, false equivale a no pagado
     * @example 'True'
     */
    @Column({
        default: false
    })
    pago: boolean

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
    @JoinColumn()
    discordUser: DiscordUser

    /**
    * @description Estado eliminacion, en false indica que existe
    * @example 'false'
    */
    @Column({ default: false })
    isDeleted: boolean;

}
