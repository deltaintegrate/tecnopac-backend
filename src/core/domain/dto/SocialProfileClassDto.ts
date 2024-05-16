import { IsNotEmpty, IsString } from 'class-validator';

export class ISocialProfileClass {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  url: string;

  created_at: Date;

  updated_at: Date;
}
