import { z } from 'zod'

export const mealIngredientSchema = z.object({
  quantity: z
    .number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be a number',
    })
    .positive({ message: 'quantity must be greater than 0' }),
  ingredientId: z
    .number({
      required_error: 'ingredient id is required',
      invalid_type_error: 'ingredient id must be a number',
    })
    .positive({ message: 'ingredient id must be greater than 0' }),
})

export const updateMealIngredientSchema = mealIngredientSchema.pick({
  quantity: true,
})
