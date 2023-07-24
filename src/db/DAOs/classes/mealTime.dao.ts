import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
import { MealTimeDTORequest } from '../../DTOs/mealTime.dto'
import { MealTime } from '../../models/MealTime'
import { IMealTimeDao } from '../interfaces/mealTimeDao.interface'

export class MealTimeDao implements IMealTimeDao {
  getMealTimeById = async (id: number): Promise<MealTime> => {
    try {
      const mealTime = await MealTime.findByPk(id)
      if (mealTime) {
        return mealTime
      }
      throw new HttpException(
        404,
        `MealTime with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getMealTimes = async (query: Query): Promise<MealTime[]> => {
    try {
      const mealTimes = await MealTime.findAll({
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })
      return mealTimes
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      await this.getMealTimeById(id)
      await MealTime.destroy({
        where: { id: id },
      })
      return `MealTime #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (newMealTime: MealTimeDTORequest): Promise<MealTime> => {
    try {
      const mealTime = await MealTime.create({ ...newMealTime })
      return mealTime
    } catch (error) {
      throw error
    }
  }
  update = async (
    id: number,
    newMealTime: MealTimeDTORequest
  ): Promise<MealTime> => {
    try {
      const mealTime = await this.getMealTimeById(id)
      mealTime.set(newMealTime)
      await mealTime.save()
      return mealTime
    } catch (error) {
      throw error
    }
  }
}
