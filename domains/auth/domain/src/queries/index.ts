// 导出查询处理器
import { GetUserHandler } from './get-user/get-user.handler';

// 导出查询
export * from './get-user/get-user';
export * from './get-user/get-user.handler';

// 导出查询处理器集合
export const AuthQueryHandlers = [GetUserHandler];
