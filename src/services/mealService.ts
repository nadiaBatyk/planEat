import { MealDao } from "../db/DAOs/meal.dao"
import { MealDTO } from "../db/DTOs/meal.dto";
import { IMeal } from "../interfaces/meal.interface";



export class MealService {
  mealDao: MealDao;
  constructor(){
    this.mealDao = new MealDao();
  }
  async getMeals(){

  }
  async getMealById(id:number){
    const meal= await this.mealDao.getMealById(id)
    return meal
  }
  async createMeal(meal:IMeal){
    const newMeal = await this.mealDao.create(meal)
    return new MealDTO(newMeal.dataValues)
  }
  async updateMeal(){
    
  }
  async deleteMeal(){
    
  }
}



