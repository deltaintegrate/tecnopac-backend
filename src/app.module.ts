import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/infrastructure/user.module';
import { PostgresTypeOrmClient } from './core/infraestructure/persistence/typeorm/PostgresTypeOrmClient';

@Module({
  imports: [ConfigModule.forRoot(), PostgresTypeOrmClient.create(), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
