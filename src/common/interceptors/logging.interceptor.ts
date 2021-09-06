import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response, Request } from 'express';
import { tap } from 'rxjs/operators';
import chalk from 'chalk';

import { PRIMARY_COLOR } from '../../environments';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		return next.handle().pipe(
			tap(() => {
				Logger.debug(
					`💬 ${chalk.hex(PRIMARY_COLOR).bold(`${request.method} - ${request.url} » ${response.statusCode}`)}`,
					'Request',
				);
			}),
		);
	}
}
