import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUser } from '../infrastructure/persistence/typeorm/TypeOrmUser';
import { Repository } from 'typeorm';
import { User } from '../domain/User';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { PageMetaDto } from 'src/core/domain/utils/PageMetaDto';
import { PageDto } from 'src/core/domain/utils/PageDto';

export class UserService {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}

  async create(user: User): Promise<User> {
    const dbUser = this.userRepository.create(user.toPrimitives());
    return (await this.userRepository.save(dbUser)) as unknown as User;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User[]>> {
    const queryBuilder = await this.userRepository.createQueryBuilder('user');

    queryBuilder
      .orderBy('user.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const value = entities.map((rawUsers) => User.create(rawUsers));
    const PageMetaDtoValue = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(value, PageMetaDtoValue);
  }
}
