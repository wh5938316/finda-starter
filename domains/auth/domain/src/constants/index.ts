/**
 * 仓库令牌常量
 * 用于依赖注入
 */

// 用户仓库令牌
export const UserRepositoryToken = Symbol('UserRepositoryToken');

// 身份仓库令牌
export const IdentityRepositoryToken = Symbol('IdentityRepositoryToken');

// 会话仓库令牌
export const SessionRepositoryToken = Symbol('SessionRepositoryToken');
