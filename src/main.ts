import 'dotenv/config'
import * as hpp from 'hpp'
import helmet from 'helmet'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true })

	app.useLogger(app.get(Logger))
	app.useGlobalInterceptors(new TransformInterceptor())
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

	app.use(hpp({ checkQuery: true, checkBody: true }))
	app.use(helmet())
	app.enableCors()

	await app.listen(3000)
}
bootstrap()
