import { Meal } from '../../models/Meal'
import { BaseDao } from './baseDao.interface'

export interface IMealDao extends BaseDao<Meal> {
  getMealById(id: number): Promise<Meal>
  getMeals():Promise<Meal[]>
}
