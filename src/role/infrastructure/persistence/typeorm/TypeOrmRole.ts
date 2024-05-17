import { TypeOrmUser } from 'src/user/infrastructure/persistence/typeorm/TypeOrmUser';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class TypeOrmRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TypeOrmUser, (user) => user.role, {
    cascade: true,
  })
  users: TypeOrmUser[];
}
