//! --- Version: 1.0.0 ---
import { NODE_ENV } from '@environments';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest<Request>();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		Logger.error(`An error occurred! (${request.path}) \n ${exception}`, 'Request');

		if (exception instanceof Error) {
			response.status(status).json({
				statusCode: status,
				path: NODE_ENV !== 'production' ? request.url : undefined,
				message: exception.message,
				stack: NODE_ENV !== 'production' ? exception.stack : undefined,
			});
			return;
		}

		response.status(status).json({
			statusCode: status,
			path: NODE_ENV !== 'production' ? request.url : undefined,
			message: 'Internal Sever Error!',
			stack: NODE_ENV !== 'production' ? exception : undefined,
		});
	}
}
