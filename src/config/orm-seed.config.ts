import { join } from 'path'
import { ormConfig } from './orm.config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const ormSeedConfig: TypeOrmModuleOptions = {
	...ormConfig,
	migrations: [join(__dirname, '..', 'databases/seeds', '**/*{.ts,.js}')],
}
