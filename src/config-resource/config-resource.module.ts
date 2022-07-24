import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigResourceController } from './config-resource.controller';
import { ConfigResourcesService } from './config-resource.service';
import { ConfigResource } from './entities/config-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigResource])],
  controllers: [ConfigResourceController],
  providers: [ConfigResourcesService],
})
export class ConfigResourceModule {}
