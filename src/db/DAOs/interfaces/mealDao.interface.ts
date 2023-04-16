import { Query } from '../../../common/types/query.types'
import { Meal } from '../../models/Meal'
import { BaseDao } from './baseDao.interface'

export interface IMealDao extends BaseDao<Meal> {
  getMealById(id: number): Promise<Meal>
  getMeals(query: Query): Promise<Meal[]>
}
