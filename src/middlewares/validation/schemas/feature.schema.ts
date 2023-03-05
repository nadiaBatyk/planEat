import { z } from 'zod'

export const FeatureSchema = z.object({
  name: z
    .string({
      required_error: 'Feature name is required',
      invalid_type_error: 'Feature name must be a string',
    })
    .trim()
    .min(1, 'Feature name cannot be empty')
    .max(100, 'Feature name max length is 100 characters'),
})
