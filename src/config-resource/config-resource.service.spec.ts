import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigResourcesService } from './config-resource.service';
import { ConfigResource } from './entities/config-resource.entity';

const oneResource = {
  id: '1',
  name: 'name #1',
  value: 'value #1',
};

const resourceArray = [
  {
    id: '1',
    name: 'name #1',
    value: 'value #1',
  },
  {
    id: '2',
    name: 'name #2',
    value: 'value #2',
  },
];

describe('ConfigResourcesService', () => {
  let service: ConfigResourcesService;
  let repository: Repository<ConfigResource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigResourcesService,
        {
          provide: getRepositoryToken(ConfigResource),
          useValue: {
            find: jest.fn().mockResolvedValue(resourceArray),
            findOneBy: jest.fn().mockResolvedValue(oneResource),
            save: jest.fn().mockResolvedValue(oneResource),
            update: jest.fn(),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConfigResourcesService>(ConfigResourcesService);
    repository = module.get<Repository<ConfigResource>>(
      getRepositoryToken(ConfigResource),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a resource', () => {
      const oneResource = {
        id: '1',
        name: 'name #1',
        value: 'value #1',
      };

      expect(
        service.create({
          name: 'name #1',
          value: 'value #1',
        }),
      ).resolves.toEqual(oneResource);
    });
  });

  describe('findAll()', () => {
    it('should return an array of resources', async () => {
      const resources = await service.findAll();
      expect(resources).toEqual(resourceArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single resource', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('1')).resolves.toEqual(oneResource);
      expect(repoSpy).toBeCalledWith({ id: '1' });
    });
  });

  describe('update', () => {
    it('should call update with the passed value', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      await service.update('2', oneResource);
      expect(updateSpy).toBeCalledWith('2', oneResource);
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
