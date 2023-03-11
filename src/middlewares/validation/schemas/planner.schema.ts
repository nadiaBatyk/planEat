import { z } from 'zod'

export const PlannerSchema = z.object({
  name: z
    .string({
      required_error: 'Planner name is required',
      invalid_type_error: 'Planner name must be a string',
    })
    .trim()
    .min(1, 'Planner name cannot be empty')
    .max(100, 'Planner name max length is 100 characters'),
  startDate: z
    .date({
      required_error: 'startDate is required',
      invalid_type_error: 'startDate must be a date',
    })
    .min(new Date(), { message: 'startDate must be a future date' }),
  finishDate: z.date({
    required_error: 'finishDate is required',
    invalid_type_error: 'finishDate must be a date',
  }),
  active: z.boolean({
    required_error: 'active is required',
    invalid_type_error: 'active must be a boolean',
  }),
})
export const PartialPlannerSchema = PlannerSchema.partial()
