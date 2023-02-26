import { Meal } from '../../models/Meal'
import { MealType } from '../../models/MealType'
import { BaseDao } from './baseDao.interface'

export interface IMealTypeDao extends BaseDao<MealType> {
  getMealTypeById(id: number): Promise<MealType>
  getMealTypes(): Promise<MealType[]>
  getMealsInType(id: number): Promise<Meal[]>
}
