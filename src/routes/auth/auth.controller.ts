import { AuthService } from './auth.service'
import { SignInAuthDto } from './dtos/signin-auth.dto'
import { SignUpAuthDto } from './dtos/signup-auth.dto'
import { RefreshAuthDto } from './dtos/refresh-auth.dto'
import { IsPublic } from '../../common/decorators/auth.decorator'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	async signIn(@Body() body: SignInAuthDto) {
		return this.authService.signIn(body)
	}

	@IsPublic()
	@Post('sign-up')
	async signUp(@Body() body: SignUpAuthDto) {
		return this.authService.signUp(body)
	}

	@IsPublic()
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	async refreshToken(@Body() body: RefreshAuthDto) {
		return this.authService.refreshToken(body)
	}

	@IsPublic()
	@Post('forget')
	async forget() {}
}
