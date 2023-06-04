import type { DeleteOptions, Repository } from '@core/@shared/repository'

import type { Session } from '../entity/session.entity'

export interface SessionRepository extends Repository<Session> {
  get(id: string): Promise<Session>
  save(data: Session): Promise<void>
  remove(id: string): Promise<void>
  delete(options: DeleteOptions<Session>): Promise<void>
}
