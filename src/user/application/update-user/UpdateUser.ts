import { Injectable } from '@nestjs/common';
import { IUserUpdateClass } from 'src/core/domain/dto/UserUpdateClassDto';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { User } from 'src/user/domain/User';
import { UserRepository } from 'src/user/domain/UserRepository';

@Injectable()
export class UpdateOneUser {
  constructor(private readonly repository: UserRepository) {}
  async execute(
    id: number,
    userDto: IUserUpdateClass,
  ): Promise<PageDto<User> | any> {
    const users = await this.repository.updateOne(id, userDto);
    return new PageDto(users);
  }
}
