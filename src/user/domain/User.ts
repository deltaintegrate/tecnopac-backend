import { IUserClass } from 'src/core/domain/dto/UserClassDto';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly role: number,
    readonly status: number,
    readonly socialProfile: number,
    readonly promote_status: boolean,
    readonly rating: string,
    readonly login_at: Date,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
  static create(params: IUserClass): User {
    const {
      id,
      name,
      role,
      status,
      socialProfile,
      promote_status,
      rating,
      login_at,
      created_at,
      updated_at,
    } = params;

    return new User(
      id,
      name,
      role,
      status,
      socialProfile,
      promote_status,
      rating,
      login_at,
      created_at,
      updated_at,
    );
  }

  toPrimitives(): IUserClass {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      status: this.status,
      socialProfile: this.socialProfile,
      promote_status: this.promote_status,
      rating: this.rating,
      login_at: this.login_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
