import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform, ValidationError } from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		const object = plainToClass(metadata.metatype, value)
		const errors = await validate(object)
		if (!errors.length) {
			return value
		}

		throw new HttpException({ errors: this.formatErrors(errors) }, HttpStatus.UNPROCESSABLE_ENTITY)
	}

	formatErrors(errors: ValidationError[]) {
		return errors.reduce((acc, error) => {
			acc[error.property] = Object.values(error.constraints)
			return acc
		})
	}
}
