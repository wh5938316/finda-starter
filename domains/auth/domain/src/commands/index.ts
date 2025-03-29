// 导入命令处理器
import { AuthenticateUserHandler } from './authenticate-user/authenticate-user.handler';
import { RegisterUserHandler } from './register-user/register-user.handler';
import { RequestPasswordResetHandler } from './request-password-reset/request-password-reset.handler';
import { ResetPasswordHandler } from './reset-password/reset-password.handler';
import { VerifyEmailHandler } from './verify-email/verify-email.handler';

// 导出身份认证命令
export * from './authenticate-user/authenticate-user';
export * from './authenticate-user/authenticate-user.handler';

// 导出用户注册命令
export * from './register-user/register-user';
export * from './register-user/register-user.handler';

// 导出邮箱验证命令
export * from './verify-email/verify-email';
export * from './verify-email/verify-email.handler';

// 导出密码重置相关命令
export * from './request-password-reset/request-password-reset';
export * from './request-password-reset/request-password-reset.handler';
export * from './reset-password/reset-password';
export * from './reset-password/reset-password.handler';

// 所有命令处理器集合
export const AuthCommandHandlers = [
  // 用户认证
  RegisterUserHandler,
  AuthenticateUserHandler,
  VerifyEmailHandler,
  // 密码管理
  RequestPasswordResetHandler,
  ResetPasswordHandler,
];
