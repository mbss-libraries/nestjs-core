import { Logger } from '@nestjs/common'
import { Request, Response } from 'express'

//! Currently not used!
export function LoggerMiddleware(req: Request, res: Response<unknown>, next): any {
	Logger.debug(`💬  ${req.method} - ${req.url} - ${res.statusCode}`, 'Request')
	next()
}
