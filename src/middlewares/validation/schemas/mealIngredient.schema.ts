import { z } from 'zod'

export const mealIngredientSchema = z.object({
  quantity: z
    .number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be a number',
    })
    .positive({ message: 'quantity must be greater than 0' }),
})
