import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // response will be automatically wrapped on an object within the data property
    return next.handle().pipe(map((data: unknown) => ({ data })));
  }
}

/** GET http://localhost:3000/coffees/2
 ==> what will be viewed on Postman response:
 {
    "data": {
        "id": 2,
        "name": "Coffee 2",
        "description": null,
        "brand": "Nest",
        "recommendations": 0,
        "flavors": []
    }
}
 */

/**
 import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(tap((data) => console.log('After...', data)));
  }
}

 * GET ==>  http://localhost:3000/coffees/1
==> what will be console logged:
 Before...
After... [
  Coffee {
    id: 4,
    name: 'Coffee cascade 4',
    description: null,
    brand: 'Nest',
    recommendations: 0,
    flavors: [ [Flavor], [Flavor] ]
  },
]
 */
