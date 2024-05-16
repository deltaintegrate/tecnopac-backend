import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRole } from './persistence/typeorm/TypeOrmRole';
import { RoleService } from '../application/Role.service';
import { RoleController } from './Role.controller';
import { TypeOrmRoleRepository } from './persistence/TypeOrmStatusRepository';
import { CreateRole } from '../application/status-creator/RoleCreator';
import { GetAllRole } from '../application/get-all-status/GetAllRole';
import { RoleRepository } from '../domain/RoleRepository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmRole])],
  controllers: [RoleController],
  providers: [
    RoleService,
    { provide: RoleRepository, useClass: TypeOrmRoleRepository },
    CreateRole,
    GetAllRole,
  ],
})
export class RoleModule {}
