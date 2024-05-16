import { IRoleClass } from 'src/core/domain/dto/RoleClassDto';
import { ISocialProfileClass } from 'src/core/domain/dto/SocialProfileClassDto';
import { IStatusClass } from 'src/core/domain/dto/StatusClassDto';
import { IUserClass } from 'src/core/domain/dto/UserClassDto';

export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly role: IRoleClass,
    readonly status: IStatusClass,
    readonly socialProfiles: ISocialProfileClass[],
    readonly promote_status: boolean,
    readonly rating: string,
    readonly login_at: Date,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly is_deleted: boolean,
    readonly is_suspend: boolean,
    readonly is_archive: boolean,
  ) {}
  static create(params: IUserClass): User {
    const {
      id,
      name,
      role,
      status,
      socialProfiles,
      promote_status,
      rating,
      login_at,
      created_at,
      updated_at,
      is_deleted,
      is_suspend,
      is_archive,
    } = params;

    return new User(
      id,
      name,
      role,
      status,
      socialProfiles,
      promote_status,
      rating,
      login_at,
      created_at,
      updated_at,
      is_deleted,
      is_suspend,
      is_archive,
    );
  }

  toPrimitives(): IUserClass {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      status: this.status,
      socialProfiles: this.socialProfiles,
      promote_status: this.promote_status,
      rating: this.rating,
      login_at: this.login_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
      is_deleted: this.is_deleted,
      is_suspend: this.is_suspend,
      is_archive: this.is_archive,
    };
  }
}
