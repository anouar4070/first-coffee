// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { App } from 'supertest/types';
// import { AppModule } from './../src/app.module';

// // Define a fallback API key if process.env.API_KEY is undefined
// const API_KEY = process.env.API_KEY ?? 'default-api-key';

// describe('AppController (e2e)', () => {
//   let app: INestApplication<App>;

//   // Set up the NestJS application before each test
//   beforeEach(async () => {
//     // Create a testing module with AppModule
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     // Create and initialize the NestJS application
//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   // Test the root endpoint (GET /)
//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/') // Send GET request to root endpoint
//       .set('Authorization', API_KEY) // Set Authorization header with defined API key
//       .expect(200) // Expect HTTP status 200
//       .expect('Hello World!'); // Expect response body to be 'Hello World!'
//   });

//   // Clean up after each test
//   afterEach(async () => {
//     await app.close(); // Close the NestJS application to free resources
//   });
// });

/*
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
//import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', process.env.API_KEY)
      .expect(200)
      .expect('Hello World!');
  });
});
*/

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types'; // Uncommented this line
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>; // Used App from supertest/types

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // Ensure API_KEY is defined before using it
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // You might want to throw an error or log a warning here
      // if API_KEY is crucial for the test to run correctly.
      // For now, we'll just skip the test or let it fail if not provided.
      console.warn('API_KEY environment variable is not set. Test might fail.');
    }

    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', apiKey as string) // Assert apiKey as string
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  })
});

/**   "jest.e2e-spec.json" before Diving into e2e tests
 {
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
 */


