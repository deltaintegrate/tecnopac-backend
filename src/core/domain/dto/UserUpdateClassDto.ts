import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { IRoleClass } from './RoleClassDto';
import { IStatusClass } from './StatusClassDto';
import { ISocialProfileClass } from './SocialProfileClassDto';

export class SocialProfile {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

export class IUserUpdateClass {
  id?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  @Type(() => IRoleClass)
  role?: IRoleClass;

  @IsOptional()
  @Type(() => IStatusClass)
  status?: IStatusClass;

  @IsOptional()
  @IsArray()
  socialProfiles?: ISocialProfileClass[];

  @IsOptional()
  @IsBoolean()
  promote_status?: boolean;

  @IsOptional()
  is_deleted?: boolean;

  @IsOptional()
  is_suspend?: boolean;

  @IsOptional()
  is_archive?: boolean;

  @IsOptional()
  @IsString()
  rating?: string;

  @IsOptional()
  login_at?: Date;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}
