import { Exclude, Expose } from 'class-transformer'

export class AppResponseDto {
	@Exclude()
	created_at: Date

	@Exclude()
	updated_at: Date

	@Expose({ name: 'createdAt' })
	transformCreatedAt?() {
		return this.created_at
	}

	@Expose({ name: 'updatedAt' })
	transformUpdatedAt?() {
		return this.updated_at
	}

	constructor(partial: Partial<AppResponseDto>) {
		Object.assign(this, partial)
	}
}
