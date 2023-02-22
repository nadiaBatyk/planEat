import HttpException from '../../common/error/HttpException'
import { MealDTO } from '../DTOs/meal.dto'

import { Ingredient } from '../models/Ingredient'
import { Meal } from '../models/Meal'
import { MealType } from '../models/MealType'
import { IMealDao } from './interfaces/mealDao.interface'

export class MealDao implements IMealDao {
  async getMealById(id: number): Promise<Meal> {
    try {
      const meal = await Meal.findByPk(id, { include: [MealType, Ingredient] })
      if (meal) {
        return meal?.dataValues
      }
      throw new HttpException(
        404,
        `Meal with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async getMeals(): Promise<Meal[]> {
    try {
      const meals = await Meal.findAll({
        include: [MealType, Ingredient],
        order: [['id', 'ASC']],
      })
      return meals
    } catch (error) {
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async exists(m: MealDTO): Promise<boolean> {
    const meal = await this.getMealById(m?.id as number)
    return !!meal.dataValues
  }
  async delete(m: MealDTO): Promise<void> {
    try {
      const rowNumber = await Meal.destroy({
        where: { id: m.id },
      })
      console.log(rowNumber)
    } catch (error) {
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async create(m: MealDTO): Promise<Meal> {
    try {
      const meal = await Meal.create({ ...m })
      return meal.dataValues
    } catch (error) {
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
}
