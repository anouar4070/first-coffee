//*******    e2e Test Logic using jasmine     ********/
// import { Test, TestingModule } from '@nestjs/testing';
// import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
// import { CoffeesModule } from '../../src/coffees/coffees.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
// import * as request from 'supertest';
// import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';

// dotenv.config();

// describe('[Feature] Coffees - /coffees', () => {
//   const coffee = {
//     name: 'Shipwreck Roast',
//     brand: 'Buddy Brew',
//     flavors: ['chocolate', 'vanilla'],
//   };
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         CoffeesModule,
//         TypeOrmModule.forRoot({
//           type: 'postgres',
//           host: process.env.POSTGRES_HOST,
//           port: 5434,
//           username: process.env.POSTGRES_USER,
//           password: process.env.POSTGRES_PASSWORD,
//           database: process.env.POSTGRES_DB,
//           autoLoadEntities: true,
//           synchronize: true,
//         }),
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();

//     app.useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//         transform: true, // 👈 this allows type conversion based on the TypeScript type
//         forbidNonWhitelisted: true,
//         transformOptions: {
//           enableImplicitConversion: true, //no need to specify types with @Type() on dto:  @Type(() => Number)
//         },
//       }),
//     );

//     await app.init();
//   });

//   it('Create [POST /]', () => {
//     return request(app.getHttpServer())
//       .post('/coffees')
//       .send(coffee as CreateCoffeeDto)
//       .expect(HttpStatus.CREATED)
//       .then(({ body }) => {
//         const expectedCoffee = jasmine.objectContaining({
//           ...coffee,
//           flavors: jasmine.arrayContaining(
//             coffee.flavors.map((name) => jasmine.objectContaining({ name })),
//           ),
//         });
//         expect(body).toEqual(expectedCoffee);
//       });
//   });
//   it.todo('Get all [GET /]');
//   it.todo('Get one [GET /:id]');
//   it.todo('Update one [PATCH /:id]');
//   it.todo('Delete one [DELETE /:id]');

//   afterAll(async () => {
//     await app.close();
//   });
// });

//*******    e2e Test Logic using Jest     ********/
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';

dotenv.config();

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;

  const coffee: CreateCoffeeDto = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: 5434,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create [POST /]', async () => {
    const response = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee)
      .expect(HttpStatus.CREATED);

    const body = response.body as {
      id: number;
      name: string;
      brand: string;
      flavors: { id: number; name: string }[];
      recommendations: number;
    };

    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: coffee.name,
        brand: coffee.brand,
        flavors: expect.arrayContaining(
          coffee.flavors.map((flavorName) =>
            expect.objectContaining({ name: flavorName }),
          ),
        ),
        recommendations: expect.any(Number),
      }),
    );
  });

  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');
});
