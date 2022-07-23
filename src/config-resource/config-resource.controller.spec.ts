import { Test, TestingModule } from '@nestjs/testing';
import { ConfigResourceController } from './config-resource.controller';
import { ConfigResourceService } from './config-resource.service';

describe('ConfigResourceController', () => {
  let controller: ConfigResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigResourceController],
      providers: [ConfigResourceService],
    }).compile();

    controller = module.get<ConfigResourceController>(ConfigResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
