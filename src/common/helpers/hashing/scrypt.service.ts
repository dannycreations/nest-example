import { promisify } from 'util'
import { Injectable } from '@nestjs/common'
import { HashingService } from './hashing.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'

const scrypt = promisify(_scrypt)

@Injectable()
export class ScryptService implements HashingService {
	async hash(data: string | Buffer): Promise<string> {
		const salt = randomBytes(8).toString('hex')
		const hash = (await scrypt(data, salt, 32)) as Buffer
		return `${salt}.${hash.toString('hex')}`
	}

	async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
		const [salt, storedHash] = encrypted.split('.')
		const hash = (await scrypt(data, salt, 32)) as Buffer
		return storedHash === hash.toString('hex')
	}
}
