import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { User } from './User';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { IUserUpdateClass } from 'src/core/domain/dto/UserUpdateClassDto';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User[]>>;
  abstract deleteAll(): Promise<boolean>;
  abstract deleteOne(id: number): Promise<boolean>;
  abstract updateOne(id: number, userDto: IUserUpdateClass): Promise<User>;
  abstract archiveAll(): Promise<boolean>;
  abstract archiveOne(): Promise<boolean>;
  abstract suspendAll(): Promise<boolean>;
  abstract suspendOne(): Promise<boolean>;
}
