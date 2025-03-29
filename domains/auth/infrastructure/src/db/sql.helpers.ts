import { sql } from 'drizzle-orm';

/**
 * 转换为小写的SQL帮助函数
 */
export function lower(column: any) {
  return sql`lower(${column})`;
}
