import { z } from 'zod'

export const MealFeatureSchema = z.object({
  value: z
    .string({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(1, 'Value cannot be empty'),
  featureId: z
    .number({
      required_error: 'feature id is required',
      invalid_type_error: 'feature id must be a number',
    })
    .positive({ message: 'feature id must be greater than 0' }),
})
