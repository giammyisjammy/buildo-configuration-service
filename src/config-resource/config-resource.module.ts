import { Module } from '@nestjs/common';
import { ConfigResourceService } from './config-resource.service';
import { ConfigResourceController } from './config-resource.controller';

@Module({
  controllers: [ConfigResourceController],
  providers: [ConfigResourceService],
})
export class ConfigResourceModule {}
