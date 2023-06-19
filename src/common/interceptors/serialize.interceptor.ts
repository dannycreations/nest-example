import { map } from 'rxjs'
import { plainToInstance, ClassConstructor } from 'class-transformer'
import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common'

export function UseSerialize(dto: ClassConstructor<{}>) {
	return UseInterceptors(new SerializeInterceptor(dto))
}

@Injectable()
class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: ClassConstructor<{}>) {}

	intercept(_: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(map((data) => plainToInstance(this.dto, data, { excludeExtraneousValues: true })))
	}
}
