import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';

import { CommandBus, QueryBus } from '@finda-co/core';
import { schema } from '@finda-co/database';
import {
  IdentityRepositoryToken,
  SessionRepositoryToken,
  UserRepositoryToken,
} from '@finda-co/domain-auth-core';
import {
  IdentityRepository,
  // SessionRepository,
  // UserRepository
} from '@finda-co/domain-auth-infra';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [
    // AuthController
  ],
  providers: [
    // 服务
    // AuthService,

    // 仓库
    // {
    //   provide: UserRepositoryToken,
    //   useClass: UserRepository,
    // },
    // {
    //   provide: SessionRepositoryToken,
    //   useClass: SessionRepository,
    // },
    {
      provide: IdentityRepositoryToken,
      useClass: IdentityRepository,
    },
  ],
  exports: [],
})
export class AuthModule { }
