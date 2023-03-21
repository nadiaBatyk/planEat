import { z } from 'zod'

export const mealTimeSchema = z.object({
  name: z
    .string({
      required_error: 'Meal Type name is required',
      invalid_type_error: 'Meal Type name must be a string',
    })
    .trim()
    .min(1, 'Meal Type name cannot be empty')
    .max(100, 'Meal Type name max length is 100 characters'),
})
