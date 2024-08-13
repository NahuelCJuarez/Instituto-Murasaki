import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm"
import { User } from "./users.entity"

@Entity({
    name: 'DiscordUser'
})
export class DiscordUser {
    /**
     * @description Usuario del instituto
     */
    @OneToOne(() => User, (user) => user.discordUser)
    user: User

    /**
     * @description Id del usuario en Discord
     */
    @PrimaryColumn()
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