import { Module } from '@nestjs/common'
import { UsersEntity } from './users.entity'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'

@Module({
	imports: [TypeOrmModule.forFeature([UsersEntity])],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
