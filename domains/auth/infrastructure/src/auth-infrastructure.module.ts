import { Module } from '@nestjs/common';

// import { RedisModule } from '@nestjs-modules/ioredis';

import {
  IdentityRepositoryToken,
  // SessionRepositoryToken,
  // UserRepositoryToken,
} from '@finda-co/domain-auth-core';

import { IdentityRepository } from './repositories/identity.repository';

// import { SessionRepository } from './repositories/session.repository';
// import { UserRepository } from './repositories/user.repository';
// import { RedisService } from './services/redis.service';

/**
 * 认证领域基础设施模块
 * 提供认证相关的仓库实现和基础设施服务
 */
@Module({
  imports: [
    // RedisModule.forRootAsync({
    //   useFactory: () => {
    //     const host = process.env.REDIS_HOST || 'localhost';
    //     const port = parseInt(process.env.REDIS_PORT || '6379', 10) || 6379;
    //     return {
    //       type: 'single',
    //       url: `redis://${host}:${port}`,
    //       options: {
    //         db: parseInt(process.env.REDIS_DB || '0', 10) || 0,
    //         username: process.env.REDIS_USERNAME || 'default',
    //         password: process.env.REDIS_PASSWORD || '',
    //       },
    //     };
    //   },
    // }),
  ],
  providers: [
    // 服务
    // RedisService,

    // 仓库实现
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
  exports: [
    // 导出仓库令牌，以便其他模块可以注入这些仓库
    // UserRepositoryToken,
    // SessionRepositoryToken,
    IdentityRepositoryToken,

    // 导出服务，如果其他模块需要直接使用
    // RedisService,
  ],
})
export class AuthInfrastructureModule {}
