import HttpException from '../../common/error/HttpException'
import { Ingredient } from '../models/Ingredient'
import { Meal } from '../models/Meal'
import { MealType } from '../models/MealType'
import { IMealDao } from './interfaces/mealDao.interface'

export class MealDao implements IMealDao {
  async getMealById(id: number): Promise<Meal> {
    try {
      const meal = await Meal.findByPk(id)
      return meal?.dataValues
    } catch (error) {
      const err = new HttpException(
        500,
        'Internal server error',
        error as string
      )
      throw err
    }
  }
  async getMeals(): Promise<Meal[]> {
    try {
      const f = await Meal.findAll({
        include: [MealType, Ingredient],
        order: [['id', 'ASC']],
      })
      return f
    } catch (error) {
        const err = new HttpException(
            500,
            'Internal server error',
            error as string
          )
          throw err
    }
  }
  async exists(m: Meal): Promise<boolean> {
    const meal = await this.getMealById(m.id)
    return !!meal.dataValues 
  }
  async delete(m: Meal): Promise<void> {
    try {
      await Meal.destroy({
        where: { id: m.id },
      })
    } catch (error) {
      const err = new HttpException(
        500,
        'Internal server error',
        error as string
      )
      throw err
    }
  }
  async create(m: Meal): Promise<Meal> {
    try {
      const meal = await Meal.create({ ...m })
      return meal.dataValues
    } catch (error) {
      const err = new HttpException(
        500,
        'Internal server error',
        error as string
      )
      throw err
    }
  }
}
