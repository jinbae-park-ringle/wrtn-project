import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error_code = exception.getResponse();
    let message;
    let status;

    switch (error_code) {
      case 'PGRST116':
        message = '결과가 존재하지 않습니다.';
        status = HttpStatus.NOT_FOUND;
        break;
      case '23505':
        message = '이메일 중복.';
        status = HttpStatus.CONFLICT;
        break;
      default:
        message = '에러 발생';
        status = exception.getStatus();
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
