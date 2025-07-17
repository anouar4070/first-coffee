import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository, ObjectLiteral } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
import { NotFoundException } from '@nestjs/common';

// Define a type for mocking TypeORM repositories, where each method is a Jest mock
type MockRepository<T extends ObjectLiteral> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

// Factory function to create a mock repository with mocked methods (findOne, create)
const createMockRepository = <
  T extends ObjectLiteral,
>(): MockRepository<T> => ({
  findOne: jest.fn(), // Mock the findOne method
  create: jest.fn(), // Mock the create method
});

describe('CoffeesService', () => {
  let service: CoffeesService; // Instance of the service to be tested
  let coffeeRepository: MockRepository<Coffee>; // Mock repository for Coffee entity

  // Set up the testing module before each test
  beforeEach(async () => {
    // Create a testing module with necessary dependencies
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Load configuration module with coffeesConfig to provide coffeesConfig.KEY
        ConfigModule.forRoot({
          load: [coffeesConfig], // Load the coffeesConfig
        }),
      ],
      providers: [
        CoffeesService,
        // Mock DataSource with an empty object (minimal mock for dependency injection)
        { provide: DataSource, useValue: {} },
        // Mock Flavor repository using the createMockRepository function
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        // Mock Coffee repository using the createMockRepository function
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    // Retrieve the CoffeesService instance from the module
    service = module.get<CoffeesService>(CoffeesService);
    // Retrieve the mocked Coffee repository for use in tests
    coffeeRepository = module.get<MockRepository<Coffee>>(
      getRepositoryToken(Coffee),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository.findOne?.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne?.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
        } catch (err: unknown) {
          // Explicitly type err as NotFoundException
          expect(err).toBeInstanceOf(NotFoundException);
          if (err instanceof NotFoundException) {
            // Type guard
            expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
          }
        }
      });
    });
    /**
      describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne?.mockReturnValue(null);

        await expect(service.findOne(coffeeId)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
     */
  });
});

/**
 ✅ When to use which?
get() → Use when your service is singleton (default scope).

resolve() → Use when your service or dependencies are request-scoped or transient, and you want to test per-request behavior.
 */
