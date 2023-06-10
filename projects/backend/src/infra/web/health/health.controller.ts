import { Controller, Get } from '@nestjs/common'

import type { HealthOutput } from './health.output'

@Controller('/health')
export class HealthController {
  @Get('/')
  async check(): Promise<HealthOutput> {
    return {
      success: true
    }
  }
}
