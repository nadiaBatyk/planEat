export interface MealTypeDTOResponse {
  id?: number
  name: string
}
export type MealTypeDTORequest = Pick<MealTypeDTOResponse, 'name'>
