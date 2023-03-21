import { z } from 'zod'

export const mealSchema = z.object({
  name: z
    .string({
      required_error: 'Meal name is required',
      invalid_type_error: 'Meal name must be a string',
    })
    .trim()
    .min(1, 'Meal name cannot be empty')
    .max(100, 'Meal name max length is 100 characters'),
})
