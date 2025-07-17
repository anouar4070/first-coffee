import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository, ObjectLiteral } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T extends ObjectLiteral> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <
  T extends ObjectLiteral,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository<Coffee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [coffeesConfig], // Load the coffeesConfig
        }),
      ],
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
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
  });
});

/**
 ✅ When to use which?
get() → Use when your service is singleton (default scope).

resolve() → Use when your service or dependencies are request-scoped or transient, and you want to test per-request behavior.
 */
