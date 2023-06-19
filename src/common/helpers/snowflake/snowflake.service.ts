import cluster from 'node:cluster'
import { Injectable } from '@nestjs/common'
import { Snowflake } from '@sapphire/snowflake'

const snowflake = new Snowflake(922406400000n)

@Injectable()
export class SnowflakeService {
	generateId() {
		return snowflake
			.generate({
				workerId: BigInt(cluster.worker?.id || 0),
				processId: BigInt(process.pid),
			})
			.toString()
	}
}
