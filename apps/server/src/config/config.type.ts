import { AppConfig } from './configuration';

// 生成点分路径联合类型（允许任何层级的路径）
type PathsImpl<T, P extends string = ''> =
  // 这部分保留原来的路径
  {
    [K in keyof T]: T[K] extends Record<string, any>
      ?
          | `${P}${P extends '' ? '' : '.'}${Exclude<K, symbol>}`
          | PathsImpl<T[K], `${P}${P extends '' ? '' : '.'}${Exclude<K, symbol>}`>
      : `${P}${P extends '' ? '' : '.'}${Exclude<K, symbol>}`;
  }[keyof T];

// 将空字符串添加到路径中，以支持根节点访问
type Paths<T> = '' | PathsImpl<T>;

// 根据路径获取对应类型
type GetTypeAtPath<T, P extends string> = P extends ''
  ? T
  : P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? GetTypeAtPath<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

export type AppConfigPaths = Paths<AppConfig>;
export type AppConfigType<P extends AppConfigPaths> = GetTypeAtPath<AppConfig, P>;
