import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  testGlobalConfig() {
    try {
      // 获取整个配置对象
      const fullConfig = config('');

      // 获取整个server对象
      const serverConfig = config('server');

      // 获取server的单个属性
      const port = config('server.port');
      const host = config('server.host');

      // 获取database对象
      const databaseConfig = config('database');

      // 获取database的单个属性
      const dbUrl = config('database.url');
      const poolSize = config('database.poolSize');

      console.log('测试模块 - 全局config函数测试:');
      console.log('完整配置:', fullConfig);
      console.log('服务器配置(对象):', serverConfig);
      console.log('服务器端口:', port);
      console.log('服务器主机:', host);
      console.log('数据库配置(对象):', databaseConfig);
      console.log('数据库URL:', dbUrl);
      console.log('数据库连接池大小:', poolSize);

      return {
        message: '在TestModule中成功使用全局config函数',
        fullConfig,
        serverConfigAsObject: serverConfig,
        serverConfigAsProps: { port, host },
        databaseConfigAsObject: databaseConfig,
        databaseConfigAsProps: { url: dbUrl, poolSize },
      };
    } catch (error: any) {
      console.error('全局config函数测试失败:', error);
      return {
        message: '全局config函数测试失败',
        error: error.message,
      };
    }
  }
}
