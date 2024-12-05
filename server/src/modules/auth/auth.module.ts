import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../../providers/user.providers';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('TOKEN_EXPIRES_IN'), },
      })
    }),
    DatabaseModule
  ],
  providers: [AuthService, JwtStrategy, UserService, ...userProviders,],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
