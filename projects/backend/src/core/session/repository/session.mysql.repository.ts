import type { DataSource, Repository } from 'typeorm'

import type { Database } from '@infra/database'

import { Session } from '../entity/session.entity'
import type { SessionRepository } from './session.repository'
import { SessionModel } from './session.mysql.model'
import { Id } from '@core/@shared/id.object-value'

export class SessionMysqlRepository implements SessionRepository {
  private readonly repository: Repository<SessionModel>

  constructor(readonly database: Database<DataSource>) {
    this.repository = database.client.getRepository(SessionModel)
  }

  async get(id: string): Promise<Session> {
    const data = await this.repository.findOne({ where: { id } })

    if (data === null) {
      throw new Error('Object not found')
    }

    const session = new Session(
      {
        userId: new Id(data.userId),
        expireIn: data.expireIn
      },
      data.id,
      data.createdAt,
      data.updatedAt
    )

    return session
  }

  async save(data: Session): Promise<void> {
    const model = this.repository.create({
      id: data.id.value,
      userId: data.userId.value,
      expireIn: data.expireIn,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })

    await this.repository.save(model)
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}
