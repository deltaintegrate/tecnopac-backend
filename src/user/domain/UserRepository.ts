import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { User } from './User';
import { PageDto } from 'src/core/domain/utils/PageDto';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User[]>>;
  abstract deleteAll(): Promise<boolean>;
  abstract deleteOne(): Promise<boolean>;
  abstract updateOne(): Promise<User>;
  abstract archiveAll(): Promise<boolean>;
  abstract archiveOne(): Promise<boolean>;
  abstract suspendAll(): Promise<boolean>;
  abstract suspendOne(): Promise<boolean>;
}
