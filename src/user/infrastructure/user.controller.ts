import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsers } from '../application/get-all-users/GetAllUser';
import { IUserClass } from 'src/core/domain/dto/UserClassDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { CreateUsers } from '../application/user-creator/UserCreator';
import { DeleteOneUser } from '../application/delete-user/DeleteUser';
import { DeleteAllUser } from '../application/delete-all-users/DeleteAllUser';
import { ArchiveAllUser } from '../application/archive-all-all/ArchiceAllUser';
import { SuspendAllUser } from '../application/suspend-all-user/ArchiceAllUser';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreator: CreateUsers,
    private readonly getAllUsers: GetAllUsers,
    private readonly deleteOne: DeleteOneUser,
    private readonly deleteAllUser: DeleteAllUser,
    private readonly archiveAll: ArchiveAllUser,
    private readonly suspendAll: SuspendAllUser,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been succesfully created',
  })
  async create(@Body() createUserDto: IUserClass): Promise<IUserClass> {
    return this.userCreator.execute({
      ...createUserDto,
    });
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Get all users',
  })
  @ApiOkResponse({ type: [IUserClass] })
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<IUserClass[]> {
    return this.getAllUsers.execute(pageOptionsDto);
  }

  @Delete()
  @ApiCreatedResponse({
    description: 'Delete One User',
  })
  deleteOneUser(@Query() id: number): Promise<IUserClass[]> {
    return this.deleteOne.execute(id);
  }

  @Delete('/all')
  @ApiCreatedResponse({
    description: 'Delete One User',
  })
  deleteAllUsers(): Promise<boolean> {
    return this.deleteAllUser.execute();
  }

  @Delete('/archive/all')
  @ApiCreatedResponse({
    description: 'Delete One User',
  })
  archiveAllUsers(): Promise<boolean> {
    return this.archiveAll.execute();
  }

  @Delete('/suspend/all')
  @ApiCreatedResponse({
    description: 'Delete One User',
  })
  suspendAllUsers(): Promise<boolean> {
    return this.suspendAll.execute();
  }
}
