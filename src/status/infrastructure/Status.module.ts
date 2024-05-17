import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmStatus } from './persistence/typeorm/TypeOrmStatus';
import { StatusController } from './Status.controller';
import { StatusService } from '../application/status.service';
import { StatusRepository } from '../domain/StatusRepository';
import { TypeOrmStatusRepository } from './persistence/TypeOrmStatusRepository';
import { CreateStatus } from '../application/status-creator/StatusCreator';
import { GetAllStatus } from '../application/get-all-status/GetAllStatus';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmStatus])],
  controllers: [StatusController],
  providers: [
    StatusService,
    { provide: StatusRepository, useClass: TypeOrmStatusRepository },
    CreateStatus,
    GetAllStatus,
  ],
})
export class StatusModule {}
