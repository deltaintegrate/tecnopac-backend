import { Injectable } from '@nestjs/common';
import { IUserUpdateClass } from 'src/core/domain/dto/UserUpdateClassDto';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { UserService } from 'src/user/application/user.service';
import { User } from 'src/user/domain/User';
import { UserRepository } from 'src/user/domain/UserRepository';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private readonly service: UserService) {}
  deleteAll(): Promise<boolean> {
    return this.service.deleteAllUser();
  }
  updateOne(id: number, createUserDto: IUserUpdateClass): Promise<User> {
    return this.service.updateOneUser(id, createUserDto);
  }
  archiveAll(): Promise<boolean> {
    return this.service.archiveAllUser();
  }
  archiveOne(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  suspendAll(): Promise<boolean> {
    return this.service.suspendAllUser();
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

  deleteOne(id: number): Promise<boolean> {
    return this.service.deleteOne(id);
  }
}
