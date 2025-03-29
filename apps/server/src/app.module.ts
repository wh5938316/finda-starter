import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [ConfigModule, TestModule],
  controllers: [AppController],
})
export class AppModule {}
