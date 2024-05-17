import { PageDto } from 'src/core/domain/utils/PageDto';
import { Status } from './Status';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';

export abstract class StatusRepository {
  abstract save(user: Status): Promise<Status>;
  abstract getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Status[]>>;
  abstract deleteOne(): Promise<boolean>;
}
