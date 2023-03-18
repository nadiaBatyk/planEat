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
      .max(100, 'Planner name max length is 100 characters')
      .transform(val => val.toUpperCase()),
    startDate: z
      .string({
        required_error: 'startDate is required',
        invalid_type_error: 'startDate must be a iso datetime',
      })
      .datetime({
        message: `startDate must be a UTC datetime string ex. '2023-01-01T00:00:00Z'`,
      })
      .refine(validateDate, {
        message: `start date can't be a past date`,
      }),
    finishDate: z
      .string({
        required_error: 'finishDate is required',
        invalid_type_error: 'finishDate must be a iso datetime',
      })
      .datetime({
        message: `finishDate must be a UTC datetime string ex. '2023-01-01T00:00:00Z'`,
      })
      .refine(validateDate, {
        message: `finish Date can't be a past date`,
      }),
    active: z.boolean({
      required_error: 'active is required',
      invalid_type_error: 'active must be a boolean',
    }),
  })
  .refine(
    async data =>
      new Date(data.startDate).getTime() < new Date(data.finishDate).getTime(),
    {
      message: 'start date must be before finish date',
    }
  )
function validateDate(date: string) {
  return new Date(date) >= new Date()
}
