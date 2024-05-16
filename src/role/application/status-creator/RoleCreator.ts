import { Injectable } from '@nestjs/common';
import { IRoleClass } from 'src/core/domain/dto/RoleClassDto';
import { Role } from 'src/Role/domain/Role';
import { RoleRepository } from 'src/role/domain/RoleRepository';

@Injectable()
export class CreateRole {
  constructor(private readonly repository: RoleRepository) {}
  async execute(request: IRoleClass): Promise<Role> {
    const role = Role.create(request);
    return await this.repository.save(role);
  }
}
