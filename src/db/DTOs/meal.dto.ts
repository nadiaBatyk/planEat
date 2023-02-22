import { IMeal } from "../../interfaces/meal.interface"

export class MealDTO {
  id?: number
  name: string
  mealTypeId: number

  constructor(meal:IMeal) {
    this.name = meal.name
    this.mealTypeId = meal.mealTypeId
    this.id = meal.id
  }
}
