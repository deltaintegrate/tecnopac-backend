import { Injectable } from '@nestjs/common';
import { IStatusClass } from 'src/core/domain/dto/StatusClassDto';
import { Status } from 'src/status/domain/Status';
import { StatusRepository } from 'src/status/domain/StatusRepository';

@Injectable()
export class CreateStatus {
  constructor(private readonly repository: StatusRepository) {}
  async execute(request: IStatusClass): Promise<Status> {
    const status = Status.create(request);
    return await this.repository.save(status);
  }
}
