import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { UserRepository } from 'src/user/domain/UserRepository';

@Injectable()
export class DeleteAllUser {
  constructor(private readonly repository: UserRepository) {}
  async execute(): Promise<PageDto<boolean> | any> {
    const users = await this.repository.deleteAll();
    return new PageDto(users);
  }
}
