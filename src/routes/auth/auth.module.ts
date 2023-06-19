import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { ConfigModule } from '@nestjs/config'
import JwtConfig from '../../config/jwt.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { UsersEntity } from '../users/users.entity'
import { UsersService } from '../users/users.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStategy } from './strategies/local.strategy'
import { HashingModule } from '../../common/helpers/hashing/hashing.module'
import { SnowflakeModule } from '../../common/helpers/snowflake/snowflake.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UsersEntity]),
		ConfigModule.forFeature(JwtConfig),
		JwtModule.registerAsync(JwtConfig.asProvider()),
		HashingModule,
		SnowflakeModule,
	],
	controllers: [AuthController],
	providers: [AuthService, UsersService, LocalStategy, JwtStrategy],
})
export class AuthModule {}
