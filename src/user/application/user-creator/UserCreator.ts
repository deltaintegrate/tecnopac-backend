import { Injectable } from '@nestjs/common';
import { IUserClass } from 'src/core/domain/dto/UserClassDto';
import { User } from 'src/user/domain/User';
import { UserRepository } from 'src/user/domain/UserRepository';

@Injectable()
export class CreateUsers {
  constructor(private readonly repository: UserRepository) {}
  async execute(request: IUserClass): Promise<User> {
    const user = User.create(request);
    return await this.repository.save(user);
  }
}
