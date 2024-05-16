import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IRoleClass } from 'src/core/domain/dto/RoleClassDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';
import { CreateRole } from '../application/status-creator/RoleCreator';
import { GetAllRole } from '../application/get-all-status/GetAllRole';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly userCreator: CreateRole,
    private readonly getAllUsers: GetAllRole,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been succesfully created',
  })
  async create(@Body() createUserDto: IRoleClass): Promise<IRoleClass> {
    return this.userCreator.execute({
      ...createUserDto,
    });
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Get all users',
  })
  @ApiOkResponse({ type: [IRoleClass] })
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<IRoleClass[]> {
    return this.getAllUsers.execute(pageOptionsDto);
  }
}
