import { PageDto } from 'src/core/domain/utils/PageDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { Role } from './Role';

export abstract class RoleRepository {
  abstract save(role: Role): Promise<Role>;
  abstract getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Role[]>>;
  abstract deleteOne(): Promise<boolean>;
}
