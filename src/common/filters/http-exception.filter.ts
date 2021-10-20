//! --- Version: 1.0.0 ---
import { NODE_ENV } from '@environments';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const statusCode = exception.getStatus();
		Logger.error(`${exception.message} - (${request.path})`, 'Request');

		response.status(statusCode).json({
			statusCode,
			message: NODE_ENV !== 'production' ? exception.message : 'Internal Server Error!',
			stack: NODE_ENV !== 'production' ? exception.stack : undefined,
			path: NODE_ENV !== 'production' ? request.url : undefined,
		});
	}
}
