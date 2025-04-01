import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CommandBus, QueryBus } from '@finda-co/core';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthenticateUserCommand,
  GetUserQuery,
  IUserRepository,
  RegisterUserCommand,
  RequestPasswordResetCommand,
  ResetPasswordCommand,
  SessionId,
  UserDto,
  UserId,
  UserRepositoryToken,
  VerifyEmailCommand,
} from '@finda-co/domain-auth-core';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * 用户注册
   */
  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    isAnonymous = false,
  ) {
    const userId = await this.commandBus.execute(
      new RegisterUserCommand(email, password, firstName, lastName, isAnonymous),
    );

    const user = await this.queryBus.execute(new GetUserQuery(userId));

    return user;
  }

  /**
   * 用户登录
   */
  async login(email: string, password: string) {
    const sessionId = await this.commandBus.execute(new AuthenticateUserCommand(email, password));
    return { sessionId };
  }

  // /**
  //  * 用户登出
  //  */
  // async logout(sessionId: string): Promise<{ success: boolean }> {
  //   try {
  //     // 转换字符串为SessionId对象
  //     const sessionIdObj = SessionId.from(sessionId);
  //     const user = await this.userRepository.findBySessionId(sessionIdObj);

  //     if (!user) {
  //       // 如果找不到用户，也认为登出成功
  //       return { success: true };
  //     }

  //     // 移除会话
  //     user.removeSession(sessionId);

  //     // 保存用户
  //     await this.userRepository.save(user);

  //     return { success: true };
  //   } catch (error: any) {
  //     throw new UnauthorizedException('登出失败');
  //   }
  // }

  // /**
  //  * 验证会话是否有效
  //  */
  // async validateSession(sessionId: string): Promise<UserDto> {
  //   try {
  //     // 转换字符串为SessionId对象
  //     const sessionIdObj = SessionId.from(sessionId);
  //     // 根据会话ID查找用户
  //     const user = await this.userRepository.findBySessionId(sessionIdObj);

  //     if (!user) {
  //       throw new UnauthorizedException('无效的会话');
  //     }

  //     // 检查会话是否已过期
  //     const session = user.getCurrentSession();
  //     if (!session || session.isExpired()) {
  //       throw new UnauthorizedException('会话已过期');
  //     }

  //     return UserDto.from(user);
  //   } catch (error: any) {
  //     if (error instanceof UnauthorizedException) {
  //       throw error;
  //     }
  //     throw new UnauthorizedException('无效的认证');
  //   }
  // }

  // /**
  //  * 检查用户是否有特定角色
  //  */
  // async checkUserRole(userId: string, requiredRole: string): Promise<boolean> {
  //   try {
  //     // 转换字符串为UserId对象
  //     const userIdObj = UserId.from(userId);
  //     const user = await this.userRepository.findById(userIdObj);

  //     if (!user) {
  //       throw new UnauthorizedException('用户不存在');
  //     }

  //     // 获取用户角色
  //     const userRole = user.role || 'user';
  //     // 检查用户是否拥有所需角色
  //     return userRole === requiredRole;
  //   } catch (error: any) {
  //     throw new UnauthorizedException(error.message);
  //   }
  // }

  // /**
  //  * 验证用户邮箱
  //  */
  // async verifyEmail(userId: string) {
  //   try {
  //     await this.commandBus.execute(new VerifyEmailCommand(userId));
  //     return { success: true };
  //   } catch (error: any) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // /**
  //  * 请求重置密码
  //  */
  // async requestPasswordReset(email: string) {
  //   try {
  //     const token = await this.commandBus.execute(new RequestPasswordResetCommand(email));
  //     return { token };
  //   } catch (error: any) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // /**
  //  * 重置密码
  //  */
  // async resetPassword(userId: string, token: string, newPassword: string) {
  //   try {
  //     await this.commandBus.execute(new ResetPasswordCommand(userId, token, newPassword));
  //     return { success: true };
  //   } catch (error: any) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // /**
  //  * 获取用户信息
  //  */
  // async getUser(
  //   userId: string,
  //   includeIdentities = false,
  //   includeSessions = false,
  // ): Promise<UserDto> {
  //   try {
  //     return await this.queryBus.execute(
  //       new GetUserQuery(userId, includeIdentities, includeSessions),
  //     );
  //   } catch (error: any) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new BadRequestException(error.message);
  //   }
  // }
}
