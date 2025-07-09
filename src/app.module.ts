// ***********   Method 1 ( ConfigService )   ***********
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CoffeesModule } from './coffees/coffees.module';
// import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
// import { DatabaseModule } from './database/database.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // make variables available within all the app
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('POSTGRES_HOST'),
//         port: parseInt(configService.get('POSTGRES_PORT') ?? '5433', 10),
//         username: configService.get('POSTGRES_USER'),
//         password: configService.get('POSTGRES_PASSWORD'),
//         database: configService.get('POSTGRES_DB'),
//         autoLoadEntities: true,
//         synchronize: true, //only for development
//       }),
//     }),
//     CoffeesModule,
//     CoffeeRatingModule,
//     DatabaseModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// ***********   Method 2 ( process.env )   ***********

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +(process.env.POSTGRES_PORT ?? 5433),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, //only for development
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
