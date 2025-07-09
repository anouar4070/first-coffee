import { Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { DataSource } from 'typeorm';

//class MockCoffeesService {}

// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
//   controllers: [CoffeesController],
//   //providers: [CoffeesService],
//   //providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
//   providers: [
//     CoffeesService,
//     { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
//   ],
//   exports: [CoffeesService],
// })
// export class CoffeesModule {}

/**    *** Class Providers ***
 
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

  @Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],

  providers: [
    CoffeesService,
    { provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService,
     },
  { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}

 */

/**
 //  *** Factory Providers ***

export class CoffeeBrandsFactory {
  create() {
    /// .. do something ...
    return ['buddy brew', 'nescafe'];
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
 */

//  *** Async Providers ***
// @Module({
//   imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
//   controllers: [CoffeesController],
//   providers: [
//     CoffeesService,
//     {
//       provide: COFFEE_BRANDS,
//       useFactory: async (connection: DataSource): Promise<string[]> => {
//         // const coffeeBrands = await connection.query('SELECT * ...');
//         const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
//         console.log('[!] Async factory');
//         return coffeeBrands;
//       },
//       inject: [DataSource],
//     },
//   ],
//   exports: [CoffeesService],
// })
// export class CoffeesModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}

/**
 | Where `Scope.TRANSIENT` Is Applied    | Code Example                                                              | Effect on `CoffeesService` Instantiation | Number of `console.log` (`CoffeesService instantiated`) |
| ------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| ❌ Nowhere *(default behavior)*        | `@Injectable()` <br> `COFFEE_BRANDS` without scope                        | Singleton (one shared instance)          | 1                                                       |
| ✅ On the **provider** `COFFEE_BRANDS` | `providers: [{ provide: COFFEE_BRANDS, scope: Scope.TRANSIENT }]`         | **No effect on CoffeesService**          | 1 *(if CoffeesService is a singleton)*                  |
| ✅ On the **service** `CoffeesService` | `@Injectable({ scope: Scope.TRANSIENT })`                                 | New instance **on every injection**      | 2 or more *(depending on number of injections)*         |
| ✅ On **both** (service + provider)    | `@Injectable({ scope: Scope.TRANSIENT })` <br> `COFFEE_BRANDS` with scope | `CoffeesService` always transient        | 2 or more *(same as above)*                             |

 */
