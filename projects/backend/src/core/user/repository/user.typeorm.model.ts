import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { SessionTypeOrmModel } from './session.typeorm.model'

@Entity({ name: 'users' })
export class UserTypeOrmModel {
  @PrimaryColumn('uuid')
  id: string

  @Column({ name: 'full_name' })
  fullName: string

  @Column({ name: 'document' })
  document: string

  @Column({ name: 'username' })
  username: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'sessions' })
  sessions: SessionTypeOrmModel[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  constructor(values: Partial<UserTypeOrmModel>) {
    Object.assign(this, values)
  }
}
