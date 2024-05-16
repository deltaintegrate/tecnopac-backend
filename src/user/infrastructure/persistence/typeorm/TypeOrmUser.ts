import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class TypeOrmUser {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  role: number;

  @Column()
  status: number;

  @Column()
  socialProfile: number;

  @Column()
  promote_status: boolean;

  @Column()
  rating: string;

  @Column()
  login_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
