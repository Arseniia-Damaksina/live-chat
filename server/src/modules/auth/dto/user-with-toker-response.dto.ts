import { IsNotEmpty, IsString } from "class-validator";
import { UserResponseDto } from "../../user/model/dto/user-response.dto";

export class UserWithTokenResponseDto extends UserResponseDto {
    @IsString()
    @IsNotEmpty() 
    accessToken: string;
}