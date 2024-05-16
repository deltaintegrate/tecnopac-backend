import { Injectable } from '@nestjs/common';
import { TypeOrmStatus } from '../infrastructure/persistence/typeorm/TypeOrmStatus';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../domain/Status';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageMetaDto } from 'src/core/domain/utils/PageMetaDto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(TypeOrmStatus)
    private readonly userRepository: Repository<TypeOrmStatus>,
  ) {}

  async create(status: Status): Promise<Status> {
    const dbStatus = this.userRepository.create(status.toPrimitives());
    return (await this.userRepository.save(dbStatus)) as unknown as Status;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Status[]>> {
    const queryBuilder = await this.userRepository.createQueryBuilder('status');

    queryBuilder
      .orderBy('status.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const value = entities.map((rawStatus) => Status.create(rawStatus));
    const PageMetaDtoValue = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(value, PageMetaDtoValue);
  }
}
