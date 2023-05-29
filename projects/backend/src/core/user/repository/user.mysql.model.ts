import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'fin_users' })
export class UserModel {
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
