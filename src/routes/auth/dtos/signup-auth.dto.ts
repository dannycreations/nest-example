import { IsString } from 'class-validator'
import { SignInAuthDto } from './signin-auth.dto'

export class SignUpAuthDto extends SignInAuthDto {
	@IsString()
	firstName: string

	@IsString()
	lastName: string
}
