import { IsNotEmpty, IsString } from 'class-validator';

export class IStatusClass {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  created_at: Date;

  updated_at: Date;
}
