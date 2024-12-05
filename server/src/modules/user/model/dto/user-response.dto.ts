import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserResponseDto {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty() 
    username: string;

    @IsString()
    @IsOptional()
    password?: string;
}