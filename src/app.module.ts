import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/infrastructure/user.module';
import { PostgresTypeOrmClient } from './core/infraestructure/persistence/typeorm/PostgresTypeOrmClient';
import { StatusModule } from './status/infrastructure/Status.module';
import { RoleModule } from './role/infrastructure/Role.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresTypeOrmClient.create(),
    UserModule,
    StatusModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
