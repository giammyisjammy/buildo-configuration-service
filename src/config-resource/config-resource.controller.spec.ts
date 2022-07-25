import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigResourceController } from './config-resource.controller';
import { ConfigResourcesService } from './config-resource.service';
import { ConfigResource } from './entities/config-resource.entity';

jest.mock('./config-resource.service');
const oneResource = {
  id: '1',
  name: 'name #1',
  value: 'value #1',
};

describe('ConfigResourceController', () => {
  let controller: ConfigResourceController;
  let service: ConfigResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigResourceController],
      providers: [ConfigResourcesService],
    }).compile();

    controller = module.get<ConfigResourceController>(ConfigResourceController);
    service = module.get<ConfigResourcesService>(ConfigResourcesService);
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
      const result = [oneResource];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a ConfigResource when resource is present', async () => {
      const result: ConfigResource = oneResource;
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(result.id)).toBe(result);
    });

    it('should throw when resource is not present', async () => {
      const result: ConfigResource = oneResource;
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      expect(controller.findOne(result.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should call the service', async () => {
      controller.update(oneResource.id, {
        value: 'new value',
      });

      expect(service.update).toHaveBeenCalled();
    });

    it('should throw if service fails', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('id not found'));

      expect(
        controller.update(oneResource.id, {
          value: 'new value',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call the service', async () => {
      controller.remove(oneResource.id);

      expect(service.remove).toHaveBeenCalled();
    });

    it('should throw if service fails', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error('id not found'));

      expect(controller.remove(oneResource.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
