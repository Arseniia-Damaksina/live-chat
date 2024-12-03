import { Module } from '@nestjs/common';
import { userProviders } from '../db/user.providers';
import { DatabaseModule } from '../db/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [...userProviders],
    exports: [...userProviders],
  })
  export class UserModule {}
