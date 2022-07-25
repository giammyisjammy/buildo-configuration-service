import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ConfigResourceModule } from '../src/config-resource/config-resource.module';
import { CreateConfigResourceDto } from '../src/config-resource/dto/create-config-resource.dto';

describe('Resources - /config (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('DATABASE_HOST', 'localhost'),
            port: +configService.get<number>('DATABASE_PORT', 3306),
            username: configService.get<string>('DATABASE_USERNAME', 'root'),
            password: configService.get<string>('DATABASE_PASSWORD', 'root'),
            database: configService.get<string>('DATABASE_NAME', 'test'),
            autoLoadEntities: true,
            synchronize: process.env.NODE_ENV !== 'production', // otherwise you can lose production data.
          }),
          inject: [ConfigService],
        }),
        ConfigResourceModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /config]', () => {
    const resource = {
      name: 'Name #1',
      value: 'Value #1',
    };

    return request(app.getHttpServer())
      .post('/config')
      .send(resource as CreateConfigResourceDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            name: expect.stringContaining(resource.name),
            value: expect.stringContaining(resource.value),
          }),
        );
      });
  });

  it('Get all resources [GET /config]', () => {
    return request(app.getHttpServer())
      .get('/config')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one resource [GET /config/:id]', async () => {
    const resource = {
      name: 'Name #2',
      value: 'Value #2',
    };

    const response = await request(app.getHttpServer())
      .post('/config')
      .send(resource as CreateConfigResourceDto);

    const id = response.body.id;

    await request(app.getHttpServer())
      .get(`/config/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Delete one resource [DELETE /config/:id]', async () => {
    const resource = {
      name: 'Name #2',
      value: 'Value #2',
    };

    const response = await request(app.getHttpServer())
      .post('/config')
      .send(resource as CreateConfigResourceDto);

    const id = response.body.id;

    await request(app.getHttpServer()).delete(`/config/${id}`).expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
