import { TypeOrmModule } from '@nestjs/typeorm';
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
      ssl: process.env.DATABASE_SSL === 'true',
      extra: {
        ssl:
          process.env.DATABASE_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
      entities: [TypeOrmUser],
    });
  }
}
