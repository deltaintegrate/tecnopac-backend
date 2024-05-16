import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsers } from '../application/get-all-users/GetAllUser';
import { IUserClass } from 'src/core/domain/dto/UserClassDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { CreateUsers } from '../application/user-creator/UserCreator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreator: CreateUsers,
    private readonly getAllUsers: GetAllUsers,
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
}
