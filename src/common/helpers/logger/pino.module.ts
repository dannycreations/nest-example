import { Module } from '@nestjs/common'
import { LoggerModule as PinoModule } from 'nestjs-pino'

@Module({
	imports: [
		PinoModule.forRoot({
			pinoHttp: {
				base: undefined,
				transport: {
					target: 'pino-pretty',
					options: {
						singleLine: true,
						translateTime: 'SYS:hh:MM:ss TT',
					},
				},
			},
		}),
	],
})
export class LoggerModule {}
