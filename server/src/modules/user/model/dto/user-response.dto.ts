import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserResponseDto {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty() 
    username: string;
}