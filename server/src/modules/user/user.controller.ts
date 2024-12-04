import { CreateUserDto } from './model/dto/create-user.dto';
import { UserResponseDto } from './model/dto/user-response.dto';
import { User } from './model/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return await this.userService.register(createUserDto);
    }

    @Get()
    async getAllUsers(): Promise<UserResponseDto[]> {
        return await this.userService.findAllUsers();
    }

    @Post()
    login() {}
}
