import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { RoleRepository } from 'src/role/domain/RoleRepository';
import { GetAllRoleResponse } from './GetAllRoleResponse';

@Injectable()
export class GetAllRole {
  constructor(private readonly repository: RoleRepository) {}
  async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<GetAllRoleResponse> | any> {
    const role = await this.repository.getAll(pageOptionsDto);
    const RoleData = role.data.map((role) => role.toPrimitives());
    return new PageDto(RoleData, role.meta);
  }
}
