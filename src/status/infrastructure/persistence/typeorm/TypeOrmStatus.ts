import { TypeOrmUser } from 'src/user/infrastructure/persistence/typeorm/TypeOrmUser';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('status')
export class TypeOrmStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TypeOrmUser, (user) => user.status, {
    cascade: true,
  })
  users: TypeOrmUser[];
}
