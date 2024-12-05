import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';
import { NextFunction } from 'express';
import { Errors } from '../common/errors';
import { User } from '../modules/user/model/user.entity';
import { UserResponseDto } from '../modules/user/model/dto/user-response.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const splittedToken: string[] = req.headers['authorization'].split(' ');
      const decodedToken = await this.authService.verifyJwt(splittedToken[1]);
      const user: UserResponseDto = await this.userService.findUserByEmail(decodedToken.email);
      if(user) {
        next();
      } else {
        throw new UnauthorizedException(Errors.UNAUTHORIZED);
      }
    } catch {
      throw new UnauthorizedException(Errors.UNAUTHORIZED);
    }
  }
}
