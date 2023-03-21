import { MealTime } from '../../models/MealTime'
import { BaseDao } from './baseDao.interface'

export interface IMealTimeDao extends BaseDao<MealTime> {
  getMealTimeById(id: number): Promise<MealTime>
  getMealTimes(): Promise<MealTime[]>
}
