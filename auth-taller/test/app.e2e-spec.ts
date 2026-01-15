import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth System (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  const mockUser = {
    nombre: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Configuración igual a main.ts
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    it('/auth/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(mockUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.user).toBeDefined();
          expect(res.body.user.password).toBeUndefined();
          expect(res.body.user.email).toBe(mockUser.email);
        });
    });

    it('/auth/register (POST) - should fail with duplicate email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(mockUser)
        .expect(409);
    });

    it('/auth/login (POST) - should login and return JWT', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: mockUser.email,
          password: mockUser.password,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.access_token).toBeDefined();
          accessToken = res.body.access_token;
        });
    });

    it('/auth/login (POST) - should fail with wrong password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: mockUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('/auth/profile (GET) - should return user profile with valid token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.user.email).toBe(mockUser.email);
        });
    });

    it('/auth/profile (GET) - should fail without token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);
    });
  });
});
