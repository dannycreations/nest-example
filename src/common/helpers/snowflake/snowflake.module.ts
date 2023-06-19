import { Module } from '@nestjs/common'
import { SnowflakeService } from './snowflake.service'

@Module({
	imports: [],
	controllers: [],
	providers: [SnowflakeService],
	exports: [SnowflakeService],
})
export class SnowflakeModule {}
