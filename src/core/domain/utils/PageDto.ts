import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './PageMetaDto';

export class PageDto<T> {
  @ApiProperty({
    example: '{}',
    description: 'información de respuesta',
  })
  readonly data: T;

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta?: PageMetaDto;

  constructor(data: T, meta?: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
