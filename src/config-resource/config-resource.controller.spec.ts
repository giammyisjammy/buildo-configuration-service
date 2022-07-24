import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigResourceController } from './config-resource.controller';
import { ConfigResourceService } from './config-resource.service';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { ConfigResource } from './entities/config-resource.entity';

jest.mock('./config-resource.service');
const dummyItem: ConfigResource = new ConfigResource('something', '42');

describe('ConfigResourceController', () => {
  let controller: ConfigResourceController;
  let service: ConfigResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigResourceController],
      providers: [ConfigResourceService],
    }).compile();

    controller = module.get<ConfigResourceController>(ConfigResourceController);
    service = module.get<ConfigResourceService>(ConfigResourceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service', async () => {
      controller.create({ name: 'something', value: 'valuable' });

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of ConfigResource', async () => {
      const result: ConfigResource[] = [dummyItem];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a ConfigResource when resource is present', async () => {
      const result: ConfigResource = dummyItem;
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(result.id)).toBe(result);
    });

    it('should throw when resource is not present', async () => {
      const result: ConfigResource = dummyItem;
      jest.spyOn(service, 'findOne').mockImplementation(() => null);

      expect(() => {
        controller.findOne(result.id);
      }).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should call the service', async () => {
      controller.update(dummyItem.id, {
        value: 'new value',
      });

      expect(service.update).toHaveBeenCalled();
    });

    it('should throw if service fails', async () => {
      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new Error('id not found');
      });

      expect(() => {
        controller.update(dummyItem.id, {
          value: 'new value',
        });
      }).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call the service', async () => {
      controller.remove(dummyItem.id);

      expect(service.remove).toHaveBeenCalled();
    });

    it('should throw if service fails', async () => {
      jest.spyOn(service, 'remove').mockImplementation(() => {
        throw new Error('id not found');
      });

      expect(() => {
        controller.remove(dummyItem.id);
      }).toThrow(NotFoundException);
    });
  });
});
