import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { CqrsModule } from '@finda-co/core';
import { schema } from '@finda-co/database';
import {
  // AuthCommandHandlers,
  // AuthQueryHandlers,
  IdentityRepositoryToken,
  // SessionRepositoryToken,
  // UserRepositoryToken,
} from '@finda-co/domain-auth-core';
import {
  // AuthInfrastructureModule,
  // UserMapper,
  IdentityRepository,
  // SessionRepository,
  // UserRepository,
} from '@finda-co/domain-auth-infra';

// import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule,
    CqrsModule.forRoot(),
    DrizzlePGModule.register({
      tag: 'App',
      pg: {
        connection: 'client',
        config: {
          connectionString: process.env.DATABASE_URL!,
        },
      },
      config: { schema: { ...schema } },
    }),
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
    // AuthInfrastructureModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: SessionRepositoryToken,
    //   useClass: SessionRepository
    // },
    // {
    //   provide: IdentityRepositoryToken,
    //   useClass: IdentityRepository
    // },
    // ...AuthCommandHandlers,
    // ...AuthQueryHandlers,
  ],
})
export class AppModule {}
