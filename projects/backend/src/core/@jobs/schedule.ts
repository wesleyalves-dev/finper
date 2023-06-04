import type { Job as ScheduleJob } from 'node-schedule'

export interface NodeSchedule {
  scheduleJob(
    name: string,
    schedule: string,
    task: () => Promise<void>
  ): ScheduleJob
}
