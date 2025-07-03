import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

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

//   *** Factory Providers ***

export class CoffeeBrandsFactory {
  create() {
    /** .. do something ... */
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
