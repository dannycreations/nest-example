import { registerAs } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export default registerAs(
	'mongodb',
	(): MongooseModuleOptions => ({
		uri: process.env.MONGODB_URI,
	}),
)
