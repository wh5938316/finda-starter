import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule, DomainExceptionFilter } from '@finda-co/core';
import { AuthInfrastructureModule } from '@finda-co/domain-auth-infra';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import * as entities from './entities';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: Object.values(entities),
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV !== 'production',
        ssl: process.env.NODE_ENV === 'production',
      }),
    }),
    CqrsModule.forRoot(),
    RedisModule.forRootAsync({
      useFactory: () => {
        const host = process.env.REDIS_HOST || 'localhost';
        const port = parseInt(process.env.REDIS_PORT || '6379', 10) || 6379;
        return {
          type: 'single',
          url: `redis://${host}:${port}`,
          options: {
            db: parseInt(process.env.REDIS_DB || '0', 10) || 0,
            username: process.env.REDIS_USERNAME || 'default',
            password: process.env.REDIS_PASSWORD || '',
          },
        };
      },
    }),
    TestModule,
    AuthModule,
    AuthInfrastructureModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
