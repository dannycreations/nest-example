import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import JwtConfig from '../../config/jwt.config'
import { Request, Response, NextFunction } from 'express'
import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtServ: JwtService,
		@Inject(JwtConfig.KEY)
		private readonly jwtConf: ConfigType<typeof JwtConfig>,
	) {}

	async use(req: AuthRequest, _res: Response, next: NextFunction) {
		const [_, token] = req.headers.authorization?.split(' ') ?? []
		if (token) {
			try {
				const payload = await this.jwtServ.verifyAsync(token, this.jwtConf)
				req.currentUser = payload
			} catch {
				throw new UnauthorizedException()
			}
		}

		next()
	}
}

export type AuthRequest = {
	currentUser: {
		sub: number
		email: string
	}
} & Request
