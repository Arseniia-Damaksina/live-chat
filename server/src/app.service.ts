import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './modules/user/model/user.entity';

interface Message {
  message: string
}

@Injectable()
export class AppService {
  constructor(@Inject('USER_REPOSITORY')
  private userRepository: Repository<User>){}
  getHello(): any {
    return this.userRepository.find();
  }
}
