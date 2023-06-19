import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '../../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
		super({
			secretOrKey: configService.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: any) => request?.headers.Authentication || request?.cookies?.Authentication || request?.Authentication,
			]),
		})
	}

	async validate({ userId }: any) {
		console.log('tes')
	}
}
