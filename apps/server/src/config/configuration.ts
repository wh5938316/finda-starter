/**
 * 应用配置函数
 * 从环境变量加载配置并提供默认值
 */
export const configuration = () => ({
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || 'localhost',
  },
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/finda',
    poolSize: parseInt(process.env.DATABASE_POOL_SIZE || '10', 10),
  },
});

// 配置类型定义为配置函数返回值的类型
export type AppConfig = ReturnType<typeof configuration>;
