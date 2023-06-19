import { AppService } from './app.service'
import { AppResponseDto } from './app.dto'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello() {
		const res = this.appService.getHello()
		return new AppResponseDto(res)
	}
}
