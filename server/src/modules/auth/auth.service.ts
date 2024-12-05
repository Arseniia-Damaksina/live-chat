import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Errors } from '../../common/errors';
import { UserResponseDto } from '../user/model/dto/user-response.dto';
import { UserWithTokenResponseDto } from './dto/user-with-toker-response.dto';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPassworValid = await bcrypt.compare(password, hashedPassword);

    if (!isPassworValid) {
      throw new BadRequestException(Errors.INVALID_CREDENTIALS);
    }

    return true;
  }

  async generateUserWithTokenResponseDto(
    publicUser: UserResponseDto,
  ): Promise<UserWithTokenResponseDto> {
    const payload = { ...publicUser };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRES_IN'),
    });

    return {
      ...payload,
      accessToken,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserWithTokenResponseDto> {
    const { email, password } = loginUserDto;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException(Errors.USER_DOES_NOT_EXIST);
    }

    const isPassworValid = await this.validatePassword(password, user.password);

    if (!isPassworValid) {
      throw new BadRequestException(Errors.INVALID_CREDENTIALS);
    }

    const userResponse = {
        id: user.id,
        email,
        username: user.username
    }

    return await this.generateUserWithTokenResponseDto(userResponse);
  }

  verifyJwt(jwt:string): Promise<any>{
    return this.jwtService.verifyAsync(jwt);
  }

}
