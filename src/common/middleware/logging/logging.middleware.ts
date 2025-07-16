import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.time('Request-response time');
    console.log('Hi from middleware');

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}

/**   **** Terminal ****
 5ms
 Hi from middleware
 Before...
 Request-response time: 193.668ms
 */
