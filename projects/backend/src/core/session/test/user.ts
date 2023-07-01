import { User } from '@core/user/entity/user.entity'

export const password = 'p@s4W0rD'

export const hash =
  '$2a$10$b3ugQTYeC.sZs9eLJHgGqeQ1w2v.wAmav7di0RIkGEuARNBFnAa5O'

export const user = new User(
  {
    fullName: 'John Doe',
    document: '08923974030',
    username: 'john.doe',
    password: hash
  },
  'c4600e53-9680-4c0b-94d9-bff064df7e74',
  new Date(),
  new Date()
)

user.hashPassword().then()
