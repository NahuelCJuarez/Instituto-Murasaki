import { PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class CreateUserDto {
    id: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @Transform(({ value }) => value || 'XXXXXXXXX')
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
            'La contraseña debe tener una letra mayuscula, una letra minuscula, un numero y un caracter especial: !@#$%^&* ',
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @IsOptional()
    @MinLength(3)
    @MaxLength(30)
    country: string;
    
    @IsOptional()
    birthDate: Date;

    @IsOptional()
    @IsNumber()
    phoneNumber: number;

}

export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]) {}