import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // Extract the HTTP context (we're using HTTP, not WebSocket or RPC)
    const ctx = host.switchToHttp();

    // Get the response object from the context
    const response = ctx.getResponse<Response>();

    // Extract the HTTP status code (e.g., 400, 404, 500, etc.)
    const status = exception.getStatus();

    // Extract the response body from the exception
    const exceptionResponse = exception.getResponse();

    // Format the error based on the response type
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse } // If it's a simple string, wrap it in a message object
        : (exceptionResponse as object); // Otherwise, use it as-is

    response.status(status).json({
      ...error, // Spread the original error content
      timestamp: new Date().toISOString(), // Add a timestamp for debugging or logging purposes
    });
  }
}
