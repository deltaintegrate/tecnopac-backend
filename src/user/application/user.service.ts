import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUser } from '../infrastructure/persistence/typeorm/TypeOrmUser';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { PageMetaDto } from 'src/core/domain/utils/PageMetaDto';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}

  async create(user: User): Promise<User> {
    const dbUser = this.userRepository.create(user.toPrimitives());

    return (await this.userRepository
      .save(dbUser)
      .catch((err) => console.log(err))) as unknown as User;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User[]>> {
    const queryBuilder = await this.userRepository.createQueryBuilder('user');

    queryBuilder
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.socialProfiles', 'socialProfiles')
      .where('user.is_deleted = false')
      .orderBy('user.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const value = entities.map((rawUsers) => User.create(rawUsers));
    const PageMetaDtoValue = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(value, PageMetaDtoValue);
  }

  async deleteOne(id: number): Promise<boolean> {
    const queryBuilder2 = await this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id: id['id'] })
      .getOne();
    const change = queryBuilder2;
    change.is_deleted = true;

    return await this.userRepository
      .save({
        ...queryBuilder2,
        ...change,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async deleteAllUser(): Promise<boolean> {
    const queryBuilder2 = await this.userRepository
      .createQueryBuilder('user')
      .where('user.is_deleted = false')
      .getMany();
    const change = queryBuilder2;

    let i = -1;
    const response = change.map(async (data) => {
      data.is_deleted = true;
      i++;
      return await this.userRepository.save({
        ...queryBuilder2[i],
        ...change,
      });
      i++;
    });
    return Promise.all(response).then(() => {
      return true;
    });
  }

  async archiveAllUser(): Promise<boolean> {
    const queryBuilder2 = await this.userRepository
      .createQueryBuilder('user')
      .where('user.is_deleted = false')
      .getMany();
    const change = queryBuilder2;

    let i = -1;
    const response = change.map(async (data) => {
      data.is_archive = true;
      i++;
      return await this.userRepository.save({
        ...queryBuilder2[i],
        ...change,
      });
      i++;
    });
    return Promise.all(response).then(() => {
      return true;
    });
  }

  async suspendAllUser(): Promise<boolean> {
    const queryBuilder2 = await this.userRepository
      .createQueryBuilder('user')
      .where('user.is_deleted = false')
      .getMany();
    const change = queryBuilder2;

    let i = -1;
    const response = change.map(async (data) => {
      data.is_suspend = true;
      i++;
      return await this.userRepository.save({
        ...queryBuilder2[i],
        ...change,
      });
      i++;
    });
    return Promise.all(response).then(() => {
      return true;
    });
  }
}
