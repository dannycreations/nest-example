import { join } from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const ormConfig: TypeOrmModuleOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '..', 'routes', '**/*.entity{.ts,.js}')],
	migrations: [join(__dirname, '..', 'databases/migrations', '**/*{.ts,.js}')],
	synchronize: process.env.NODE_ENV === 'development' ? true : false,
}
