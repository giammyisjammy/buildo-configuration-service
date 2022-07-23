import { Test, TestingModule } from '@nestjs/testing';
import { ConfigResourceService } from './config-resource.service';

describe('ConfigResourceService', () => {
  let service: ConfigResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigResourceService],
    }).compile();

    service = module.get<ConfigResourceService>(ConfigResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
