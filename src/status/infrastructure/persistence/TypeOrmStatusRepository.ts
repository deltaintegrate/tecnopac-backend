import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { StatusService } from 'src/status/application/status.service';
import { Status } from 'src/status/domain/Status';
import { StatusRepository } from 'src/status/domain/StatusRepository';

@Injectable()
export class TypeOrmStatusRepository implements StatusRepository {
  constructor(private readonly service: StatusService) {}

  async deleteOne(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async save(user: Status): Promise<Status> {
    return await this.service.create(user);
  }

  getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Status[]>> {
    return this.service.findAll(pageOptionsDto);
  }
}
