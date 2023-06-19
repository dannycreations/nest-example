import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ormConfig } from './config/orm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './routes/auth/auth.module'
import { UsersModule } from './routes/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from './common/helpers/logger/pino.module'
import { JwtAuthGuard } from './routes/auth/guards/jwt-auth.guard'

@Module({
	imports: [LoggerModule, TypeOrmModule.forRoot(ormConfig), ConfigModule.forRoot(), AuthModule, UsersModule],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		ConfigService,
	],
	exports: [ConfigService],
})
export class AppModule {}
