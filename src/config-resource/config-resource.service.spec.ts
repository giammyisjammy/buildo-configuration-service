import { Test, TestingModule } from '@nestjs/testing';
import { ConfigResourceService } from './config-resource.service';
import { ConfigResource } from './entities/config-resource.entity';

type Repository<T> = {
  findOneBy: (id: string) => Promise<T>;
  delete: (id: string) => Promise<void>;
};

const oneConfigResource = new ConfigResource('test 1', 'value for test 1');

const configResourceArray = [
  oneConfigResource,
  new ConfigResource('test 2', 'value for test 2'),
  new ConfigResource('test 3', 'value for test 3'),
];

describe('ConfigResourceService', () => {
  let service: ConfigResourceService;
  let repository: Repository<ConfigResource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigResourceService,
        // {
        //   // provide: getRepositoryToken(ConfigResource),
        //   provide: ConfigResource,
        //   useValue: {
        //     find: jest.fn().mockResolvedValue(configResourceArray),
        //     findOneBy: jest.fn().mockResolvedValue(oneConfigResource),
        //     save: jest.fn().mockResolvedValue(oneConfigResource),
        //     remove: jest.fn(),
        //     delete: jest.fn(),
        //   },
        // },
        ,
      ],
    }).compile();

    service = module.get<ConfigResourceService>(ConfigResourceService);
    // repository = module.get<Repository<ConfigResource>>(getRepositoryToken(ConfigResource));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert a user', () => {
      const oneConfigResource = {
        name: 'test create',
        value: 'value for test create',
      };

      expect(
        service.create({
          name: 'test create',
          value: 'value for test create',
        }),
      ).resolves.toEqual(oneConfigResource);
    });
  });

  describe('findAll', () => {
    it('should return an array of ConfigResource', async () => {
      const users = await service.findAll();
      expect(users).toEqual(configResourceArray);
    });
  });

  describe('findOne', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne(oneConfigResource.id)).resolves.toEqual(
        oneConfigResource,
      );
      expect(repoSpy).toBeCalledWith({ id: oneConfigResource.id });
    });
  });

  describe('update', () => {
    it('should call update with the passed value', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      const retVal = await service.update('2', oneConfigResource);
      expect(updateSpy).toBeCalledWith(['2', oneConfigResource]);
      // expect(retVal).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
