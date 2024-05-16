import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { UserRepository } from 'src/user/domain/UserRepository';
import { GetAllUsersResponse } from './GetAllUsersResponse';
import { PageDto } from 'src/core/domain/utils/PageDto';

@Injectable()
export class GetAllUsers {
  constructor(private readonly repository: UserRepository) {}
  async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<GetAllUsersResponse> | any> {
    const users = await this.repository.getAll(pageOptionsDto);
    const userData = users.data.map((user) => user.toPrimitives());
    return new PageDto(userData, users.meta);
  }
}
