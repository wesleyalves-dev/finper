import type { Job as ScheduleJob } from 'node-schedule'

import { LessThanOrEqual } from '@infra/database'
import { Job } from '@core/@shared/job'
import type { SessionRepository } from '@core/session/repository/session.repository'

import type { NodeSchedule } from './schedule'

export class DeleteExpiredSessionsJob extends Job {
  private readonly name = 'DeleteExpiredSessions'
  private readonly schedule = '0 * * * *' // Hourly
  private job: ScheduleJob

  constructor(
    private readonly cron: NodeSchedule,
    private readonly sessionRepository: SessionRepository
  ) {
    super()
  }

  private createJob(): void {
    const task = async (): Promise<void> => {
      await this.sessionRepository.delete({
        where: { expireIn: LessThanOrEqual(new Date()) }
      })
    }
    const { name, schedule } = this
    this.job = this.cron.scheduleJob(name, schedule, task)
  }

  start(): void {
    this.createJob()
  }

  stop(): void {
    this.job.cancel()
  }
}
