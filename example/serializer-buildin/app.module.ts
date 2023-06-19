import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClassSerializerInterceptor, Module } from '@nestjs/common'

@Module({
	imports: [],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
	exports: [],
})
export class AppModule {}
