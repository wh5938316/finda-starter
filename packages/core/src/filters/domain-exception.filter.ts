import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

import { DomainError } from '../domain/domain-error';

/**
 * 领域异常过滤器
 * 用于捕获并处理所有领域异常（DomainError及其子类）
 */
@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter<DomainError> {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 默认为400 Bad Request，可根据不同的领域异常类型设置不同的状态码
    const statusCode = this.getHttpStatusCode(exception);

    // 记录错误
    this.logger.error(`${exception.name}: ${exception.message}`, exception.stack);

    // 响应错误
    response.status(statusCode).json({
      statusCode,
      error: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * 根据领域异常类型确定对应的HTTP状态码
   * 子类可重写此方法以提供更细粒度的状态码映射
   *
   * @param exception 领域异常
   * @returns HTTP状态码
   */
  protected getHttpStatusCode(exception: DomainError): number {
    // 这里可以根据不同类型的领域异常返回不同的状态码
    // 示例:
    // if (exception instanceof ResourceNotFoundError) {
    //   return HttpStatus.NOT_FOUND;
    // }

    // 默认为400 Bad Request
    return HttpStatus.BAD_REQUEST;
  }
}
