import { IStatusClass } from 'src/core/domain/dto/StatusClassDto';

export class Status {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
  static create(params: IStatusClass): Status {
    const { id, name, created_at, updated_at } = params;

    return new Status(id, name, created_at, updated_at);
  }

  toPrimitives(): IStatusClass {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
