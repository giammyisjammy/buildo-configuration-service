import { ConfigResourceModule } from '@/config-resource/config-resource.module';
import { ConfigResourcesService } from '@/config-resource/config-resource.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('ConfigResource', () => {
  let app: INestApplication;
  const configResourceService = {
    create: () => {},
    findAll: () => ['test'],
    findOne: () => 'test',
    update: () => {},
    remove: () => {},
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigResourceModule],
    })
      .overrideProvider(ConfigResourcesService)
      .useValue(configResourceService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('config', () => {
    it(`/POST create`, () => {
      return request(app.getHttpServer())
        .post('/config')
        .send({ name: 'something', value: '42' })
        .expect(200)
        .expect({
          data: configResourceService.create(),
        });
    });
    it(`/POST create`, () => {
      return request(app.getHttpServer())
        .post('/config')
        .send({ name: 'value missing' })
        .expect(400);
    });
    it(`/GET findAll`, () => {
      return request(app.getHttpServer()).get('/config').expect(200).expect({
        data: configResourceService.findAll(),
      });
    });
    it(`/GET findOne`, () => {
      return request(app.getHttpServer()).get('/config/1').expect(200).expect({
        data: configResourceService.findOne(),
      });
    });
    it(`/PATCH update`, () => {
      return request(app.getHttpServer()).get('/config/1').expect(200).expect({
        data: configResourceService.update(),
      });
    });
    it(`/DELETE remove`, () => {
      return request(app.getHttpServer()).get('/config/1').expect(200).expect({
        data: configResourceService.remove(),
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
