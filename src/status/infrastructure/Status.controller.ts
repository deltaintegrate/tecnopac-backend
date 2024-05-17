import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatus } from '../application/status-creator/StatusCreator';
import { GetAllStatus } from '../application/get-all-status/GetAllStatus';
import { IStatusClass } from 'src/core/domain/dto/StatusClassDto';
import { PageOptionsDto } from 'src/core/domain/utils/PageOptionsDto';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(
    private readonly userCreator: CreateStatus,
    private readonly getAllUsers: GetAllStatus,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been succesfully created',
  })
  async create(@Body() createUserDto: IStatusClass): Promise<IStatusClass> {
    return this.userCreator.execute({
      ...createUserDto,
    });
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Get all users',
  })
  @ApiOkResponse({ type: [IStatusClass] })
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<IStatusClass[]> {
    return this.getAllUsers.execute(pageOptionsDto);
  }
}
