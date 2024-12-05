import { Module } from '@nestjs/common';
import { userProviders } from '../../providers/user.providers';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [...userProviders, UserService],
    exports: [...userProviders],
  })
  export class UserModule {}
