import { Module } from '@nestjs/common';
import { ConfigResourceService } from './config-resource.service';
import { ConfigResourceController } from './config-resource.controller';
import { FakeRepository } from './fake-repository';

@Module({
  controllers: [ConfigResourceController],
  providers: [ConfigResourceService, FakeRepository],
})
export class ConfigResourceModule {}
