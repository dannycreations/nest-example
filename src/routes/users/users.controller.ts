import { UsersService } from './users.service'
import { Controller, Get, NotFoundException } from '@nestjs/common'
import { IsPublic } from '../../common/decorators/auth.decorator'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@IsPublic()
	@Get('1')
	getHello(): string {
		return this.usersService.getHello()
	}

	@IsPublic()
	@Get('2')
	getHello2(): string {
		throw new NotFoundException('tes')
	}
}
