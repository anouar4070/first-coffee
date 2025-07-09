//     *** without .env variables ***
// import { Module } from '@nestjs/common';
// import { CoffeeRatingService } from './coffee-rating.service';
// import { CoffeesModule } from 'src/coffees/coffees.module';
// import { DatabaseModule } from 'src/database/database.module';

// @Module({
//   imports: [
//     // Import and configure the database connection dynamically
//     DatabaseModule.register({
//       type: 'postgres',
//       host: 'localhost',
//       password: 'password',
//       port: 5433,
//     }),
//     CoffeesModule,
//   ],
//   providers: [CoffeeRatingService],
// })
// export class CoffeeRatingModule {}

//     *** with .env variables ***
import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Optional: You can include ConfigModule here for clarity, but it's global already
    ConfigModule,
    // Register the database connection using values from environment variables
    DatabaseModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: true, // only for dev
      }),
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
