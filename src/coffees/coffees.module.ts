import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

//class MockCoffeesService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  //providers: [CoffeesService],
  //providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
