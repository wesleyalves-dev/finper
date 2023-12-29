import { validate } from 'class-validator'

import { AppError } from '@core/@shared/app.error'

export async function validateEntity(entity: object): Promise<void> {
  const errors = await validate(entity, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true
  })

  if (errors.length > 0) {
    throw new AppError('Entity validation failed', 'INTERNAL', {
      validation: errors
    })
  }
}
