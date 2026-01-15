import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}
