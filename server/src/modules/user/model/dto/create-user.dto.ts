import { IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from './../../../auth/dto/login-user.dto';

export class CreateUserDto extends LoginUserDto {
    @IsString()
    @IsNotEmpty() 
    username: string;
}