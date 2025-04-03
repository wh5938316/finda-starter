import { Module } from '@nestjs/common';

import {
  AuthCommandHandlers,
  AuthQueryHandlers,
  IdentityRepositoryToken,
  SessionRepositoryToken,
  UserRepositoryToken,
} from '@finda-co/domain-auth-core';

import { IdentityRepository } from './repositories/identity.repository';
import { SessionRepository } from './repositories/session.repository';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from './services/redis.service';

/**
 * 认证领域基础设施模块
 * 提供认证相关的仓库实现和基础设施服务
 */
@Module({
  providers: [
    // 服务
    RedisService,

    // 仓库实现
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: SessionRepositoryToken,
      useClass: SessionRepository,
    },
    {
      provide: IdentityRepositoryToken,
      useClass: IdentityRepository,
    },
    ...AuthQueryHandlers,
    ...AuthCommandHandlers,
  ],
  exports: [
    // 导出仓库令牌，以便其他模块可以注入这些仓库
    UserRepositoryToken,
    SessionRepositoryToken,
    IdentityRepositoryToken,
  ],
})
export class AuthInfrastructureModule {}
