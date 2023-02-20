import { Meal } from "../db/models/Meal"
import { MealRepository } from "../db/repositories/mealRepository"

const getMeals = async () => {
  
}
const getMeal = async () => {
  
}
const createMeal = async () => {
  
}
const updateMeal = async () => {
  
}
const deleteMeal = async (id:number) => {
  const f = new MealRepository()
  const meal= await Meal.findByPk(id)
  f.delete(meal as Meal)
  
}
export default {
  getMeals,
  createMeal,
  updateMeal,
  getMeal,
  deleteMeal,
}
