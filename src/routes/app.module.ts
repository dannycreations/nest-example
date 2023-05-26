import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { UsersEntity } from './users/users.entity'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [UsersEntity],
			synchronize: process.env.NODE_ENV === 'development' ? true : false,
		}),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
