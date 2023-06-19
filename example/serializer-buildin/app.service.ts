import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello() {
		return {
			created_at: new Date(),
			updated_at: new Date(),
		}
	}
}
