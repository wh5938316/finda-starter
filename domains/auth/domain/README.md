# Auth 领域模块

Auth 领域模块是一个基于领域驱动设计 (DDD) 原则构建的身份验证和授权系统。该模块负责处理用户注册、登录、会话管理、密码重置以及多种身份提供商的集成。

## 架构概述

本模块采用了严格的领域驱动设计架构，包括以下几个主要部分：

- **聚合根**：User 作为主要聚合根，管理用户相关的所有操作和状态
- **实体**：Identity, Session 等子实体
- **值对象**：UserId, IdentityId, Password, Email 等不可变值对象
- **领域事件**：用户注册、登录、状态变更等事件
- **命令处理器**：处理所有针对用户的指令性操作
- **查询处理器**：处理所有查询类操作
- **领域服务**：提供跨聚合的服务
- **仓储接口**：定义持久化层抽象

## 主要聚合和实体

### User

User 聚合根代表系统中的用户账户，负责：

- 用户账户生命周期管理（创建、停用、封禁等）
- 身份验证
- 会话管理
- 用户配置文件管理
- 身份关联（如社交登录）

### Identity

Identity 实体代表用户的认证源，一个用户可以有多个身份：

- 凭证类型 (credential)：用户名/密码
- 社交登录 (google, github, facebook)
- 其他 OAuth 提供商

### Session

Session 实体表示用户登录会话，负责：

- 会话生命周期管理
- 会话状态跟踪
- 会话安全控制

## 值对象

- **Password**：安全地处理密码的创建、哈希和验证
- **Email**：处理电子邮件地址的验证和标准化
- **UserId**：用户唯一标识符
- **IdentityId**：身份唯一标识符
- **SessionId**：会话唯一标识符

## 命令和查询

### 主要命令

- CreateUserCommand：创建新用户
- AuthenticateUserCommand：用户身份验证
- VerifyEmailCommand：验证用户电子邮件
- ResetPasswordCommand：重置用户密码
- LinkIdentityCommand：关联外部身份提供商

### 主要查询

- FindUserByEmailQuery：通过电子邮件查找用户
- FindUserByIdentityQuery：通过身份查找用户
- GetUserSessionsQuery：获取用户会话列表

## 异常处理

领域模块定义了丰富的异常类型，用于表达领域规则违反和错误状态：

- InvalidCredentialsError：凭证无效
- EmailNotVerifiedError：邮箱未验证
- UserAccountBannedError：用户被封禁
- UserAccountDeactivatedError：用户账户已停用
- IdentityNotFoundError：找不到指定身份
- SessionNotFoundError：找不到指定会话

## 安全特性

- 密码使用安全的哈希算法存储
- 支持强密码规则实施
- 会话超时和自动失效
- 支持多设备登录和单设备登出
