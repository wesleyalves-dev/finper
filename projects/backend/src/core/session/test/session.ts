import { Id } from '@core/@shared/id.object-value'
import { Session } from '../entity/session.entity'

export const session = new Session(
  {
    userId: new Id('0fa78ef2-7658-4b07-ae6b-c1fe6fc1078f'),
    expireIn: new Date(2099, 11, 31)
  },
  'a9e8a1c7-df87-4c16-a8dc-05f716bc0021',
  new Date(),
  new Date()
)

export const expiredSession = new Session(
  {
    userId: new Id('0fa78ef2-7658-4b07-ae6b-c1fe6fc1078f'),
    expireIn: new Date(2099, 11, 31)
  },
  'a9e8a1c7-df87-4c16-a8dc-05f716bc0021',
  new Date(),
  new Date()
)

Object.assign(expiredSession, {
  _expiredIn: new Date(2022, 11, 31),
  isExpired: () => true
})
