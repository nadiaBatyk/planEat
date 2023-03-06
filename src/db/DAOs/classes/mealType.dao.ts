import HttpException from '../../../common/error/HttpException'
import { MealTypeDTORequest } from '../../DTOs/mealType.dto'
import { Meal } from '../../models/Meal'
import { MealType } from '../../models/MealType'
import { IMealTypeDao } from '../interfaces/mealTypeDao.interface'

export class MealTypeDao implements IMealTypeDao {
  getMealTypeById = async (
    id: number,
    includeMeal: boolean = false
  ): Promise<MealType> => {
    try {
      const include = includeMeal ? { include: [Meal] } : {}
      const mealType = await MealType.findByPk(id, include)

      if (mealType) {
        return mealType?.dataValues
      }
      throw new HttpException(
        404,
        `MealType with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getMealTypes = async (): Promise<MealType[]> => {
    try {
      const mealTypes = await MealType.findAll({
        order: [['id', 'ASC']],
      })
      return mealTypes
    } catch (error) {
      throw error
    }
  }
  getMealsInType = async (id: number): Promise<Meal[]> => {
    try {
      const mealType = await this.getMealTypeById(id, true)
      return mealType.meals
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      const rowNumber = await MealType.destroy({
        where: { id: id },
      })
      if (rowNumber) {
        return `MealType #${id} has been succesfully deleted`
      }
      throw new HttpException(
        404,
        `MealType with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  create = async (t: MealTypeDTORequest): Promise<MealType> => {
    try {
      const mealType = await MealType.create({ ...t })
      return mealType.dataValues
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: MealTypeDTORequest): Promise<MealType> => {
    try {
      const mealType = await MealType.findByPk(id)
      if (mealType) {
        mealType.set(m)
        await mealType.save()
        return mealType.dataValues
      }

      throw new HttpException(
        404,
        `MealType with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
}
