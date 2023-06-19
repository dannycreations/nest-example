import { Injectable } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'
import { HashingService } from './hashing.service'

@Injectable()
export class BcryptService implements HashingService {
	async hash(data: string | Buffer): Promise<string> {
		return hash(data, await genSalt())
	}

	async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
		return compare(data, encrypted)
	}
}
