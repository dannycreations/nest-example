import { Entity, Index, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UsersEntity {
	@Index()
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	password: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
