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
    .string({
      required_error: 'startDate is required',
      invalid_type_error:
        'startDate must be a iso datetime string ex. "2023-01-01T00:00:00+02:00"',
    })
    .datetime({ offset: true })
    .refine(startDate => startDate >= new Date().toISOString(), {
      message: `start date can't be a past date`,
    }),
  finishDate: z
    .string({
      required_error: 'finishDate is required',
      invalid_type_error:
        'finishDate must be a iso datetime string ex. "2023-01-01T00:00:00+02:00"',
    })
    .datetime({ offset: true })
    .refine(finishDate => finishDate >= new Date().toISOString(), {
      message: `finish Date can't be a past date`,
    }),
  active: z.boolean({
    required_error: 'active is required',
    invalid_type_error: 'active must be a boolean',
  }),
})

PlannerSchema.refine(data => data.startDate < data.finishDate, {
  message: 'start date must be before finish date',
}).refine(data => data.finishDate > data.finishDate, {
  message: 'finish date must be after start date',
})
export const PartialPlannerSchema = PlannerSchema.partial()
