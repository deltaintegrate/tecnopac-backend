import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUser } from './persistence/typeorm/TypeOrmUser';
import { UserController } from './user.controller';
import { UserService } from '../application/user.service';
import { CreateUsers } from '../application/user-creator/UserCreator';
import { GetAllUsers } from '../application/get-all-users/GetAllUser';
import { UserRepository } from '../domain/UserRepository';
import { TypeOrmUserRepository } from './persistence/TypeOrmUserRepository';
import { TypeOrmSocialProfile } from './persistence/typeorm/TypeOrmSocialProfile';
import { DeleteOneUser } from '../application/delete-user/DeleteUser';
import { DeleteAllUser } from '../application/delete-all-users/DeleteAllUser';
import { ArchiveAllUser } from '../application/archive-all-all/ArchiceAllUser';
import { SuspendAllUser } from '../application/suspend-all-user/ArchiceAllUser';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser, TypeOrmSocialProfile])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: TypeOrmUserRepository },
    CreateUsers,
    GetAllUsers,
    DeleteOneUser,
    DeleteAllUser,
    ArchiveAllUser,
    SuspendAllUser,
  ],
})
export class UserModule {}
