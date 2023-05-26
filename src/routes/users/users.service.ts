import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { UsersEntity } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersEntity)
		private readonly repo: Repository<UsersEntity>
	) {}
}
