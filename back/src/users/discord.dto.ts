export class CreateDiscordUserDto {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: any | null;
    banner_color: string;
    clan: any | null;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
}