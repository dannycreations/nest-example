import { AbstractDocument } from './abstract.schema'
import { Logger, NotFoundException } from '@nestjs/common'
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose'

export abstract class AbstractRepository<T extends AbstractDocument> {
	protected abstract readonly logger: Logger

	protected constructor(protected readonly model: Model<T>) {}

	protected async create(document: Omit<T, '_id'>): Promise<T> {
		const createdDocument = new this.model({
			...document,
			_id: new Types.ObjectId(),
		})
		return (await createdDocument.save()).toJSON() as unknown as T
	}

	protected async find(query: FilterQuery<T>): Promise<T[]> {
		return this.model.find(query, {}, { lean: true })
	}

	protected async findOne(query: FilterQuery<T>): Promise<T> {
		const document = await this.model.findOne(query, {}, { lean: true })
		if (!document) {
			this.logger.warn('Document not found with query', query)
			throw new NotFoundException('Document not found')
		}
		return document
	}

	protected async findOneAndUpdate(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
		const document = await this.model.findOneAndUpdate(query, update, { lean: true, new: true })
		if (!document) {
			this.logger.warn('Document not found with query', query)
			throw new NotFoundException('Document not found')
		}
		return document
	}

	protected async findOneAndDelete(query: FilterQuery<T>) {
		return this.model.findOneAndDelete(query, { lean: true })
	}
}
