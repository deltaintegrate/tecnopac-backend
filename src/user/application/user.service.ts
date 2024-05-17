import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUser } from '../infrastructure/persistence/typeorm/TypeOrmUser';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { PageMetaDto } from 'src/core/domain/utils/PageMetaDto';
import { PageDto } from 'src/core/domain/utils/PageDto';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/User';
import { TypeOrmRole } from 'src/role/infrastructure/persistence/typeorm/TypeOrmRole';
import { TypeOrmSocialProfile } from '../infrastructure/persistence/typeorm/TypeOrmSocialProfile';
import { TypeOrmStatus } from 'src/status/infrastructure/persistence/typeorm/TypeOrmStatus';
import { IUserUpdateClass } from 'src/core/domain/dto/UserUpdateClassDto';

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
      .where('user.is_archive = false')
      .where('user.is_suspend = false')
      .orderBy('user.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const value = entities.map((rawUsers) => User.create(rawUsers));
    const PageMetaDtoValue = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(value, PageMetaDtoValue);
  }

  async updateOneUser(id: number, userDto: IUserUpdateClass): Promise<User> {
    const queryBuilder2 = await this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id: id['id'] })
      .getOne();
    const change = queryBuilder2;
    change.name = userDto.name ? userDto.name : queryBuilder2.name;
    change.is_archive =
      userDto.is_archive == false || userDto.is_archive == true
        ? userDto.is_archive
        : queryBuilder2.is_archive;
    change.is_deleted =
      userDto.is_deleted == false || userDto.is_deleted == true
        ? userDto.is_deleted
        : queryBuilder2.is_deleted;
    change.is_suspend =
      userDto.is_suspend == false || userDto.is_suspend == true
        ? userDto.is_suspend
        : queryBuilder2.is_suspend;
    change.rating = userDto.rating ? userDto.rating : queryBuilder2.rating;
    change.role = (userDto.role as TypeOrmRole)
      ? (userDto.role as TypeOrmRole)
      : queryBuilder2.role;
    change.socialProfiles = (userDto.socialProfiles as TypeOrmSocialProfile[])
      ? (userDto.socialProfiles as TypeOrmSocialProfile[])
      : queryBuilder2.socialProfiles;
    change.status = (userDto.status as TypeOrmStatus)
      ? (userDto.status as TypeOrmStatus)
      : queryBuilder2.status;

    console.log(change);
    return (await this.userRepository.save({
      ...queryBuilder2,
      ...change,
    })) as unknown as User;
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
