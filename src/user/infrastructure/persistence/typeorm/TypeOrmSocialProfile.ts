import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOrmUser } from './TypeOrmUser';

@Entity('social_profile')
export class TypeOrmSocialProfile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => TypeOrmUser, (user) => user.socialProfiles, {
    onDelete: 'CASCADE',
  })
  user: TypeOrmUser;
}
