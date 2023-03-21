import { z } from 'zod'
import {
  dateOnlyRegex,
  refineDate,
  regexMessage,
} from '../../../common/helpers/dates'

export const plannerSchema = z
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
        message: `startDate ${regexMessage}`,
      })
      .superRefine(refineDate)
      .transform(startDate => new Date(startDate)),
    finishDate: z
      .string({
        required_error: 'finishDate is required',
        invalid_type_error: 'finishDate must be a string',
      })
      .regex(dateOnlyRegex, {
        message: `finishDate ${regexMessage}`,
      })
      .superRefine(refineDate)
      .transform(finishDate => new Date(finishDate)),
  })
  .required()
  .strict()
  .refine(data => data.startDate.getTime() < data.finishDate.getTime(), {
    message: 'start date must be before finish date',
  })
