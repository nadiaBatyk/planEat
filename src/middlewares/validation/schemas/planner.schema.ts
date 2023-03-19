import { z } from 'zod'

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
    startDate: z.coerce
      .date({
        required_error: 'startDate is required',
        invalid_type_error: `startDate must be a UTC date with the format YYYY-MM-DD ex '2023-01-03'`,
      })
      .refine(validateDate, {
        message: `start date can't be a past date`,
      }),
    finishDate: z.coerce.date({}).refine(validateDate, {
      message: `finishDate date can't be a past date`,
    }),
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
function validateDate(date: Date) {
  let localDate = new Date()
  let currentUTCDate = new Date(
    Date.UTC(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate()
    )
  )
  console.log(new Date(date))

  return new Date(date) >= currentUTCDate
}
