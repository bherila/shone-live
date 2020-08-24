import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsBoolean()
    readonly seller: boolean;

    @IsEmail()
    readonly email: string;
}
