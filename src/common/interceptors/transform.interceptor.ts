import { map, Observable } from 'rxjs'
import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response> {
		return next.handle().pipe(
			map((data) => ({
				statusCode: ctx.switchToHttp().getResponse().statusCode,
				message: data.message ?? 'Success',
				data: data.result ?? data,
			})),
		)
	}
}

type Response = {
	statusCode: number
	message: string
	data: object[]
}
