import { IRoleClass } from 'src/core/domain/dto/RoleClassDto';

export class Role {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
  static create(params: IRoleClass): Role {
    const { id, name, created_at, updated_at } = params;

    return new Role(id, name, created_at, updated_at);
  }

  toPrimitives(): IRoleClass {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
