import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SocialProfile {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

export class IUserClass {
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  role: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNumber()
  @IsNotEmpty()
  socialProfile: number;

  @IsBoolean()
  @IsNotEmpty()
  promote_status: boolean;

  @IsNotEmpty()
  @IsString()
  rating: string;

  login_at: Date;

  created_at: Date;

  updated_at: Date;
}
