import { z } from 'zod'
export let dateOnlyRegex: RegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/

export let regexMessage: string = ` must be a UTC date with the format YYYY-MM-DD ex '2023-01-03'`

export function isValidDate(startDate: string): boolean {
  let newDate = new Date(startDate)
  return newDate instanceof Date && !isNaN(newDate.getTime())
}
export function isCurrentDate(date: string) {
  let localDate = new Date()
  let currentUTCDate = new Date(
    Date.UTC(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate()
    )
  )

  return new Date(date) >= currentUTCDate
}
export function refineDate(date: string, ctx: z.RefinementCtx) {
  if (!isValidDate(date)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'invalid date',
      fatal: true,
    })

    return z.NEVER
  }

  if (!isCurrentDate(date)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `can't be a past date`,
      fatal: true,
    })

    return z.NEVER
  }
  return true
}
