import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import JwtConfig from '../../config/jwt.config'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersEntity } from '../users/users.entity'
import { SignUpAuthDto } from './dtos/signup-auth.dto'
import { SignInAuthDto } from './dtos/signin-auth.dto'
import { RefreshAuthDto } from './dtos/refresh-auth.dto'
import { HashingService } from '../../common/helpers/hashing/hashing.service'
import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersEntity)
		private readonly usersRepository: Repository<UsersEntity>,
		private readonly hashingService: HashingService,
		private readonly jwtService: JwtService,
		@Inject(JwtConfig.KEY)
		private readonly jwtConfig: ConfigType<typeof JwtConfig>,
	) {}

	async signIn({ email, password }: SignInAuthDto) {
		const [user] = await this.usersRepository.findBy({ email })
		if (!user || !(await this.hashingService.compare(password, user.password))) {
			throw new UnauthorizedException('Invalid username or password')
		}
		return this.generateToken(user)
	}

	async signUp(data: SignUpAuthDto) {
		try {
			const user = new UsersEntity()
			user.email = data.email
			user.password = await this.hashingService.hash(data.password)
			const result = await this.usersRepository.save(user)
			return result
		} catch (err) {
			const pgUniqueViolationErrorCode = '23505'
			if (err.code === pgUniqueViolationErrorCode) {
				throw new ConflictException()
			}
			throw err
		}
	}

	async refreshToken(data: RefreshAuthDto) {
		try {
			const { sub: id } = await this.jwtService.verifyAsync(data.refreshToken, {
				secret: this.jwtConfig.secret,
				audience: this.jwtConfig.audience,
				issuer: this.jwtConfig.issuer,
			})

			const user = await this.usersRepository.findOneByOrFail({ id })
			return this.generateToken(user)
		} catch {
			throw new UnauthorizedException()
		}
	}

	async generateToken(user: UsersEntity) {
		const [accessToken, refreshToken] = await Promise.all([
			this.signToken(user.id, this.jwtConfig.accessTokenTtl, { email: user.email }),
			this.signToken(user.id, this.jwtConfig.refreshTokenTtl),
		])
		return { accessToken, refreshToken }
	}

	async signToken<T>(userId: number, expiresIn: number, payload?: T) {
		return this.jwtService.signAsync(
			{
				sub: userId,
				...payload,
			},
			{
				secret: this.jwtConfig.secret,
				audience: this.jwtConfig.audience,
				issuer: this.jwtConfig.issuer,
				expiresIn,
			},
		)
	}
}
