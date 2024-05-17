import { Injectable } from '@nestjs/common';
import { TypeOrmRole } from '../infrastructure/persistence/typeorm/TypeOrmRole';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../domain/Role';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageMetaDto } from 'src/core/domain/utils/PageMetaDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(TypeOrmRole)
    private readonly userRepository: Repository<TypeOrmRole>,
  ) {}

  async create(role: Role): Promise<Role> {
    const dbRole = this.userRepository.create(role.toPrimitives());
    return (await this.userRepository.save(dbRole)) as unknown as Role;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Role[]>> {
    const queryBuilder = await this.userRepository.createQueryBuilder('role');

    queryBuilder
      .orderBy('role.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const value = entities.map((rawRole) => Role.create(rawRole));
    const PageMetaDtoValue = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(value, PageMetaDtoValue);
  }
}
