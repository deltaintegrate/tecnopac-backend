import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { UserService } from 'src/user/application/user.service';
import { User } from 'src/user/domain/User';
import { UserRepository } from 'src/user/domain/UserRepository';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private readonly service: UserService) {}
  deleteAll(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteOne(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateOne(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  archiveAll(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  archiveOne(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  suspendAll(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  suspendOne(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<User> {
    return await this.service.create(user);
  }

  getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User[]>> {
    return this.service.findAll(pageOptionsDto);
  }
  /*

  getOneById(id: string): Promise<User> {
    return this.service.findOneById(id);
  }

  getOneByPhone(phone: string): Promise<User> {
    return this.service.findOneByPhone(phone);
  }

  delete(id: string): Promise<void> {
    return this.service.delete(id);
  }
  */
}
