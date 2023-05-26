import * as hpp from 'hpp'
import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './routes/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

	app.use(hpp({ checkQuery: true, checkBody: true }))
	app.use(helmet())

	await app.listen(3000)
}
bootstrap()
