import { z } from 'zod'
import {
  dateOnlyRegex,
  refineDate,
  regexMessage,
} from '../../../common/helpers/dates'

export const plannerEntrySchema = z
  .object({
    plannerId: z
      .number({
        required_error: 'plannerId  is required',
        invalid_type_error: 'plannerId must be a number',
      })
      .positive({ message: 'plannerId must be greater than 0' }),
    mealId: z
      .number({
        required_error: 'mealId  is required',
        invalid_type_error: 'mealId must be a number',
      })
      .positive({ message: 'mealId must be greater than 0' }),
    MealTimeId: z
      .number({
        required_error: 'MealTimeId  is required',
        invalid_type_error: 'MealTimeId must be a number',
      })
      .positive({ message: 'MealTimeId must be greater than 0' }),
    mealDate: z
      .string({
        required_error: 'mealDate is required',
        invalid_type_error: 'mealDate must be a string',
      })
      .regex(dateOnlyRegex, {
        message: `mealDate ${regexMessage}`,
      })
      .superRefine(refineDate)
      .transform(startDate => new Date(startDate)),
  })
  .required()
  .strict()
