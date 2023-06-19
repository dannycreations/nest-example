import Joi from 'joi'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import mongodbConfig from './config/mongodb.config'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				MONGODB_URI: Joi.string().required(),
			}),
		}),
		MongooseModule.forRootAsync(mongodbConfig.asProvider()),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class MongoDbModule {}
