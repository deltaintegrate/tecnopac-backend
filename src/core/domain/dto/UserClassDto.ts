import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IRoleClass } from './RoleClassDto';
import { IStatusClass } from './StatusClassDto';
import { ISocialProfileClass } from './SocialProfileClassDto';

export class SocialProfile {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

export class IUserClass {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => IRoleClass)
  role: IRoleClass;

  @IsNotEmpty()
  @Type(() => IStatusClass)
  status: IStatusClass;

  @IsNotEmpty()
  @IsArray()
  socialProfiles: ISocialProfileClass[];

  @IsBoolean()
  @IsNotEmpty()
  promote_status: boolean;

  is_deleted?: boolean;

  is_suspend?: boolean;

  is_archive?: boolean;

  @IsNotEmpty()
  @IsString()
  rating: string;

  login_at: Date;

  created_at: Date;

  updated_at: Date;
}
