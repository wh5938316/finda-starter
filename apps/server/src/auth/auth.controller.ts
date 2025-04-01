import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName?: string,
    @Body('lastName') lastName?: string,
    @Body('isAnonymous') isAnonymous?: boolean,
  ) {
    return this.authService.register(email, password, firstName, lastName, isAnonymous);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  // @Post('logout')
  // async logout(@Body('sessionId') sessionId: string) {
  //   return this.authService.logout(sessionId);
  // }

  // @Post('verify-email')
  // async verifyEmail(@Body('userId') userId: string) {
  //   return this.authService.verifyEmail(userId);
  // }

  // @Post('request-password-reset')
  // async requestPasswordReset(@Body('email') email: string) {
  //   return this.authService.requestPasswordReset(email);
  // }

  // @Post('reset-password')
  // async resetPassword(
  //   @Body('userId') userId: string,
  //   @Body('token') token: string,
  //   @Body('newPassword') newPassword: string,
  // ) {
  //   return this.authService.resetPassword(userId, token, newPassword);
  // }

  // @Get('user/:userId')
  // async getUser(
  //   @Param('userId') userId: string,
  //   @Query('includeIdentities') includeIdentities?: string,
  //   @Query('includeSessions') includeSessions?: string,
  // ) {
  //   const includeIds = includeIdentities === 'true';
  //   const includeSess = includeSessions === 'true';

  //   return this.authService.getUser(userId, includeIds, includeSess);
  // }

  // @Post('validate-session')
  // async validateSession(@Body('sessionId') sessionId: string) {
  //   return this.authService.validateSession(sessionId);
  // }
}
