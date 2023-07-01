import type { DeleteOptions } from '@core/@shared/repository'

import type { Session } from '../entity/session.entity'
import type { SessionRepository } from './session.repository'

export class SessionInMemoryRepository implements SessionRepository {
  sessions: Session[] = []

  async get(id: string): Promise<Session> {
    const data = this.sessions.find(session => session.id.value === id)

    if (data === undefined) {
      throw new Error('Object not found')
    }

    return data
  }

  async save(data: Session): Promise<void> {
    this.sessions.push(data)
  }

  async remove(id: string): Promise<void> {
    this.sessions = this.sessions.filter(session => session.id.value !== id)
  }

  async delete(options: DeleteOptions<Session>): Promise<void> {
    this.sessions = this.sessions.filter(
      session => session.id.value !== options.where?.id
    )
  }
}
