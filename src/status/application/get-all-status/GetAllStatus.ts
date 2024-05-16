import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { StatusRepository } from 'src/status/domain/StatusRepository';
import { GetAllStatusResponse } from './GetAllStatusResponse';
import { PageDto } from 'src/core/domain/utils/PageDto';

@Injectable()
export class GetAllStatus {
  constructor(private readonly repository: StatusRepository) {}
  async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<GetAllStatusResponse> | any> {
    const status = await this.repository.getAll(pageOptionsDto);
    const statusData = status.data.map((status) => status.toPrimitives());
    return new PageDto(statusData, status.meta);
  }
}
