import { SessionInMemoryRepository } from '@core/session/repository/session.in-memory.repository'

import { DeleteExpiredSessionsJob } from './delete-expired-sessions.job'

describe('DeleteExpiredSessionJob', () => {
  const cancelScheduleJob = jest.fn(() => {})
  const cronMocked = {
    scheduleJob: jest.fn((name, schedule, task) => {
      return {
        cancel: cancelScheduleJob
      }
    })
  }
  const sessionRepository = new SessionInMemoryRepository()
  const job = new DeleteExpiredSessionsJob(cronMocked as any, sessionRepository)

  it('espera iniciar e parar a execução da tarefa', () => {
    job.start()
    job.stop()

    expect(cronMocked.scheduleJob).toBeCalledTimes(1)
    expect(cancelScheduleJob).toBeCalledTimes(1)
  })
})
