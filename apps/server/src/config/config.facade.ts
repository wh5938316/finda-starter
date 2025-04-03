import * as _ from 'lodash';

import { AppConfigPaths, AppConfigType } from './config.type';
import { AppConfig } from './configuration';

export class ConfigFacade {
  private static config: AppConfig;

  static init(config: AppConfig) {
    this.config = config;
  }

  static get<P extends AppConfigPaths>(path: P): AppConfigType<P> {
    // 处理空路径或根对象
    if (path === '') {
      return this.config as AppConfigType<P>;
    }
    return _.get(this.config, path) as AppConfigType<P>;
  }
}

// 全局声明
declare global {
  function config<P extends AppConfigPaths>(path: P): AppConfigType<P>;
}

// 实现全局函数 - 使用箭头函数绑定正确的上下文
globalThis.config = <P extends AppConfigPaths>(path: P): AppConfigType<P> => {
  return ConfigFacade.get(path);
};
