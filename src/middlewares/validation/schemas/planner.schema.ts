import { z } from 'zod'
let dateOnlyRegex: RegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
export const PlannerSchema = z
  .object({
    name: z
      .string({
        required_error: 'Planner name is required',
        invalid_type_error: 'Planner name must be a string',
      })
      .trim()
      .min(1, 'Planner name cannot be empty')
      .max(100, 'Planner name max length is 100 characters'),
    startDate: z
      .string({
        required_error: 'startDate is required',
        invalid_type_error: 'startDate must be a string',
      })
      .regex(dateOnlyRegex, {
        message: `startDate must be a UTC date with the format YYYY-MM-DD ex '2023-01-03'`,
      })
      .superRefine((startDate, ctx) => {
        if (!isValidDate(startDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'invalid date',
            fatal: true,
          })

          return z.NEVER
        }

        if (!isCurrentDate(startDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `start date can't be a past date`,
            fatal: true,
          })

          return z.NEVER
        }
        return true
      })
      .transform(startDate => new Date(startDate)),
    finishDate: z
      .string({
        required_error: 'finishDate is required',
        invalid_type_error: 'finishDate must be a string',
      })
      .regex(dateOnlyRegex, {
        message: `finishDate must be a UTC date with the format YYYY-MM-DD ex '2023-01-03'`,
      })
      .superRefine((finishDate, ctx) => {
        if (!isValidDate(finishDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'invalid date',
            fatal: true,
          })

          return z.NEVER
        }

        if (!isCurrentDate(finishDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `finishDate can't be a past date`,
            fatal: true,
          })

          return z.NEVER
        }
        return true
      })
      .transform(finishDate => new Date(finishDate)),
    active: z.boolean({
      required_error: 'active is required',
      invalid_type_error: 'active must be a boolean',
    }),
  })
  .required()
  .strict()
  .refine(async data => data.startDate.getTime() < data.finishDate.getTime(), {
    message: 'start date must be before finish date',
  })
function isValidDate(startDate: string): boolean {
  let newDate = new Date(startDate)
  return newDate instanceof Date && !isNaN(newDate.getTime())
}
function isCurrentDate(date: string) {
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
