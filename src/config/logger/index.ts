import { ConsoleLogger, LoggerService } from '@nestjs/common'

export class CustomLogger extends ConsoleLogger implements LoggerService {
	constructor(context?: string) {
		super(context ?? 'undefined', { timestamp: true })
	}
	/**
	 * Write a 'log' level log.
	 */
	log(message: any, ...optionalParams: any[]) {
		super.log(message, ...optionalParams)
	}

	/**
	 * Write an 'error' level log.
	 */
	error(message: any, ...optionalParams: any[]) {
		super.error(message, ...optionalParams)
	}

	/**
	 * Write a 'warn' level log.
	 */
	warn(message: any, ...optionalParams: any[]) {
		super.warn(message, ...optionalParams)
	}

	/**
	 * Write a 'debug' level log.
	 */
	debug(message: any, ...optionalParams: any[]) {
		super.debug(message, ...optionalParams)
	}

	/**
	 * Write a 'verbose' level log.
	 */
	verbose(message: any, ...optionalParams: any[]) {
		super.verbose(message, ...optionalParams)
	}
}
