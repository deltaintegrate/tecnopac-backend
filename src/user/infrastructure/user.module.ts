import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUser } from './persistence/typeorm/TypeOrmUser';
import { UserController } from './user.controller';
import { UserService } from '../application/user.service';
import { CreateUsers } from '../application/user-creator/UserCreator';
import { GetAllUsers } from '../application/get-all-users/GetAllUser';
import { UserRepository } from '../domain/UserRepository';
import { TypeOrmUserRepository } from './persistence/TypeOrmUserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: TypeOrmUserRepository },
    CreateUsers,
    GetAllUsers,
  ],
})
export class UserModule {}
