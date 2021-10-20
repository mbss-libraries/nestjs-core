//! --- Version: 1.0.0 ---
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * This pipe is used for class-validator in dtos!
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			console.log(errors);
			throw new BadRequestException(this.formatErrors(errors), 'Validation failed');
		}
		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private formatErrors(errors: any[]) {
		return errors
			.map((err) => {
				for (const property in err.constraints) {
					return err.constraints[property];
				}
			})
			.join(';');
	}
}
