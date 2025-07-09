/**
//     *** without .env variables ***
import { Module, DynamicModule } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  // A static method to dynamically register a configured module
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          // Register the DataSource provider using a string token
          provide: 'DATA_SOURCE',
          useFactory: async () => {
            const dataSource = new DataSource(options);
            // Initialize the connection asynchronously
            return dataSource.initialize(); // wait for connection
          },
        },
      ],
      // Export the provider so it can be injected in other modules
      exports: ['DATA_SOURCE'],
    };
  }
}
*/

//     *** with .env variables ***
import { Module, DynamicModule } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  // A static method to dynamically register a configured module
  static registerAsync(options: {
    useFactory: (
      ...args: any[]
    ) => DataSourceOptions | Promise<DataSourceOptions>;
    inject?: any[];
    imports?: any[];
  }): DynamicModule {
    return {
      module: DatabaseModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'DATA_SOURCE',
          useFactory: async (...args: any[]) => {
            const config = await options.useFactory(...args);
            const dataSource = new DataSource(config);
            return dataSource.initialize();
          },
          inject: options.inject || [],
        },
      ],
      exports: ['DATA_SOURCE'],
    };
  }
}
