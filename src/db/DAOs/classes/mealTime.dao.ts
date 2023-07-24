import HttpException from '../../../common/error/HttpException'
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
  getMealTimes = async (): Promise<MealTime[]> => {
    try {
      const MealTimes = await MealTime.findAll({
        order: [['id', 'ASC']],
      })
      return MealTimes
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      const rowNumber = await MealTime.destroy({
        where: { id: id },
      })
      if (rowNumber) {
        return `MealTime #${id} has been succesfully deleted`
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
  create = async (t: MealTimeDTORequest): Promise<MealTime> => {
    try {
      const mealTime = await MealTime.create({ ...t })
      return mealTime
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: MealTimeDTORequest): Promise<MealTime> => {
    try {
      const mealTime = await MealTime.findByPk(id)
      if (mealTime) {
        mealTime.set(m)
        await mealTime.save()
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
}
