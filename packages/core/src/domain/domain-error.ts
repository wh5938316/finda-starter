/**
 * 领域错误基类
 * 所有特定领域的错误都应该继承这个基类
 */
export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    // 使用类型断言处理Node.js特定的Error属性
    const nodeJsError = Error as any;
    if (nodeJsError.captureStackTrace) {
      nodeJsError.captureStackTrace(this, this.constructor);
    }
  }
}
