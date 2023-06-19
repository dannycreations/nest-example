import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class SignInAuthDto {
	@IsEmail()
	email: string

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'Passwords must contain at least 1 upper case, 1 lower case, 1 number or special character',
	})
	password: string
}
