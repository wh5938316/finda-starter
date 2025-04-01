# Auth 基础设施模块

Auth 基础设施模块是 Auth 领域模块的技术实现层，负责提供领域模型所需的技术支持和与外部系统的集成。该模块基于领域驱动设计的六边形架构（端口与适配器模式），将领域核心逻辑与技术实现细节隔离。

## 架构概述

基础设施模块主要包括以下组件：

- **仓储实现**：实现领域层定义的仓储接口
- **数据映射**：ORM 实体与领域实体的映射转换
- **外部服务集成**：OAuth 提供商、邮件服务等
- **安全机制**：JWT 处理、密码哈希等
- **事件发布**：领域事件的持久化和分发
- **缓存管理**：会话和令牌的缓存策略

## 主要组件

### 仓储实现

- **UserRepository**：实现 IUserRepository 接口，提供用户相关的持久化操作
- **SessionRepository**：实现会话存储和检索功能
- **IdentityRepository**：管理各种身份提供商的数据访问

### 数据模型与映射

- **UserEntity**：数据库用户实体
- **IdentityEntity**：数据库身份实体
- **SessionEntity**：数据库会话实体
- **Mappers**：实体映射器，负责领域模型与数据库模型之间的转换

### 认证提供商

- **CredentialProvider**：用户名密码认证的实现
- **GoogleAuthProvider**：Google OAuth 集成
- **GithubAuthProvider**：GitHub OAuth 集成
- **FacebookAuthProvider**：Facebook OAuth 集成

### 安全服务

- **JwtService**：JWT 令牌的创建、验证和刷新
- **PasswordService**：密码哈希和验证的具体实现
- **TokenService**：访问令牌和刷新令牌的管理

### 事件处理

- **UserEventPublisher**：用户相关事件的发布实现
- **EventSubscribers**：处理领域事件的订阅者

### 缓存策略

- **RedisSessionStore**：基于 Redis 的会话存储
- **TokenCache**：令牌缓存管理
- **RateLimiter**：登录尝试限制实现

## 技术栈

基础设施层使用以下技术：

- **数据库**：PostgreSQL (通过 Drizzle ORM)
- **缓存**：Redis
- **消息**：Kafka/RabbitMQ (可选)
- **认证**：JWT, OAuth 2.0
- **API 集成**：REST, GraphQL 客户端

## 配置管理

基础设施模块支持以下配置：

- 数据库连接配置
- Redis 连接配置
- JWT 密钥和过期时间
- OAuth 提供商的凭据
- 邮件服务配置
- 密码策略配置

## 与领域层的集成

基础设施模块通过 NestJS 的依赖注入系统与领域层集成：

```typescript
import { Module } from '@nestjs/common';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AuthDomainModule } from '@finda-co/domain-auth';
import { UserRepositoryImpl } from './repositories/user.repository';
import { UserRepositoryToken } from '@finda-co/domain-auth';

@Module({
  imports: [
    AuthDomainModule,
    DrizzlePGModule.register({...}),
    RedisModule.forRoot({...}),
  ],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepositoryImpl,
    },
    // 其他提供者
  ],
  exports: [
    // 导出的服务
  ],
})
export class AuthInfrastructureModule {}
```

## 测试策略

基础设施模块的测试包括：

- 单元测试：验证各组件的独立功能
- 集成测试：验证与外部系统的交互
- 仓储测试：验证数据访问层的正确性
- 端到端测试：验证整个认证流程

## 扩展点

基础设施模块提供以下扩展点：

- 添加新的身份提供商实现
- 替换数据存储机制
- 自定义缓存策略
- 添加额外的安全机制
- 集成监控和日志系统

