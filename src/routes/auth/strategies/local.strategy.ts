import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../../users/users.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({ usernameField: 'email' })
	}

	async validate(email: string, password: string) {
		try {
			console.log('tes')
		} catch (err) {
			throw new UnauthorizedException(err)
		}
	}
}
