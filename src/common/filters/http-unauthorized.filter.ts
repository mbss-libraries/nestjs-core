import { NODE_ENV } from '@environments';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpUnauthorizedFilter implements ExceptionFilter<UnauthorizedException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const statusCode = exception.getStatus();
		Logger.warn(`[${statusCode}] Unauthorized! (${request.path})`, 'Request');

		response.status(statusCode).json({
			statusCode,
			path: NODE_ENV !== 'production' ? request.url : undefined,
			message: exception.message,
			stack: NODE_ENV !== 'production' ? exception.stack : undefined,
		});
	}
}
