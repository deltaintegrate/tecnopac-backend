import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { UserRepository } from 'src/user/domain/UserRepository';

@Injectable()
export class DeleteOneUser {
  constructor(private readonly repository: UserRepository) {}
  async execute(id: number): Promise<PageDto<boolean> | any> {
    const users = await this.repository.deleteOne(id);
    return new PageDto(users);
  }
}
