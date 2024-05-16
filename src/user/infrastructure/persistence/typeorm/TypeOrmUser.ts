import { TypeOrmRole } from 'src/role/infrastructure/persistence/typeorm/TypeOrmRole';
import { TypeOrmStatus } from 'src/status/infrastructure/persistence/typeorm/TypeOrmStatus';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOrmSocialProfile } from './TypeOrmSocialProfile';

@Entity('user')
export class TypeOrmUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => TypeOrmSocialProfile,
    (socialProfile) => socialProfile.user,
    {
      cascade: true,
    },
  )
  socialProfiles: TypeOrmSocialProfile[];

  @Column()
  promote_status: boolean;

  @Column()
  rating: string;

  @Column()
  login_at: Date;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_suspend: boolean;

  @Column({ default: false })
  is_archive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => TypeOrmRole, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  role: TypeOrmRole;

  @ManyToOne(() => TypeOrmStatus, (status) => status.users, {
    onDelete: 'CASCADE',
  })
  status: TypeOrmStatus;
}
