import { Module } from '@nestjs/common'
import { ScryptService } from './scrypt.service'
import { HashingService } from './hashing.service'

@Module({
	imports: [],
	controllers: [],
	providers: [
		{
			provide: HashingService,
			useClass: ScryptService,
		},
	],
	exports: [HashingService],
})
export class HashingModule {}
