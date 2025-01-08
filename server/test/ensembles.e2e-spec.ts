import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EnsembleIn } from '@packages/types';

describe('EnsemblesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ensembles (GET)', () => {
    return request(app.getHttpServer())
      .get('/ensembles')
      .expect(200)
  });

  
  it('/ensembles (POST)', async () => {
    const newEnsemble: EnsembleIn = {
      name: 'New Ensemble',
      userId: '677e80db216b45eaac3baba7',
      instrumentId: '677e80db216b45eaac3baba7',
      description: 'This is a new ensemble',
      positions: []
    };
    return request(app.getHttpServer())
      .post('/ensembles')
      .send(newEnsemble)
      .expect(201);
  });
});
