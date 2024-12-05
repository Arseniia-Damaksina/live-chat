import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './model/user.entity';
import { CreateUserDto } from './model/dto/create-user.dto';
import { Errors } from '../../common/errors';
import { UserResponseDto } from './model/dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  private async doesUserExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private createUserEntity(
    username: string,
    email: string,
    hashedPassword: string,
  ): User {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    return user;
  }

  private buildUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password } = createUserDto;
    const user = await this.doesUserExist(email);

    if (user) {
      throw new ConflictException(Errors.USER_EXISTS);
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = this.createUserEntity(username, email, hashedPassword);

    try {
      const registeredUser = await this.userRepository.save(newUser);
      return this.buildUserResponseDto(registeredUser);
    } catch (error) {
      throw new InternalServerErrorException(Errors.FAILED_TO_REGISTER_USER);
    }
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userRepository.find();
  }

  async login() {
    
  }
}
