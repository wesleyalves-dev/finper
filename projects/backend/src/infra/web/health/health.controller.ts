import { Controller, Get } from '@nestjs/common'

@Controller('/health')
export class HealthController {
  @Get('/')
  check(): any {
    return {
      success: true
    }
  }
}
