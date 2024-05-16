import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRole } from 'src/role/infrastructure/persistence/typeorm/TypeOrmRole';
import { TypeOrmStatus } from 'src/status/infrastructure/persistence/typeorm/TypeOrmStatus';
import { TypeOrmSocialProfile } from 'src/user/infrastructure/persistence/typeorm/TypeOrmSocialProfile';
import { TypeOrmUser } from 'src/user/infrastructure/persistence/typeorm/TypeOrmUser';

export class PostgresTypeOrmClient {
  static create() {
    return TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOSTNAME,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
      ssl: process.env.DATABASE_SSL === 'true',
      extra: {
        ssl:
          process.env.DATABASE_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
      entities: [TypeOrmUser, TypeOrmStatus, TypeOrmRole, TypeOrmSocialProfile],
    });
  }
}
