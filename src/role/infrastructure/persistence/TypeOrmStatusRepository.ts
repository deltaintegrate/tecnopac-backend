import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { RoleService } from 'src/role/application/Role.service';
import { Role } from 'src/Role/domain/Role';
import { RoleRepository } from 'src/Role/domain/RoleRepository';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  constructor(private readonly service: RoleService) {}

  async deleteOne(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async save(role: Role): Promise<Role> {
    return await this.service.create(role);
  }

  getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Role[]>> {
    return this.service.findAll(pageOptionsDto);
  }
}
