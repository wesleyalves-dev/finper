import { addDays as fnsAddDays } from 'date-fns'

export const time = {
  addDays(date: Date, amount: number): Date {
    return fnsAddDays(date, amount)
  }
}
