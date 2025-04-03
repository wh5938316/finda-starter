import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigFacade } from './config.facade';
import { configuration } from './configuration';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
  providers: [
    {
      provide: 'APP_CONFIG',
      useFactory: () => {
        const config = configuration();
        ConfigFacade.init(config);
        console.log('配置初始化成功:', JSON.stringify(config, null, 2));
        return config;
      },
    },
  ],
  exports: ['APP_CONFIG'],
})
export class ConfigModule {}
