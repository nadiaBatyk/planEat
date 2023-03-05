import { z } from 'zod'
import { MeasureUnit } from '../../../common/types/measureUnit.types'

export const IngredientSchema = z.object({
  name: z
    .string({
      required_error: 'Ingredient name is required',
      invalid_type_error: 'Ingredient name must be a string',
    })
    .trim()
    .min(1, 'Ingredient name cannot be empty')
    .max(100, 'Ingredient name max length is 100 characters'),
  unit: z.nativeEnum(MeasureUnit),
})
export const PartialIngredientSchema = IngredientSchema.partial()
