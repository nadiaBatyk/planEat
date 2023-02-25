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
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async getMeals(): Promise<Meal[]> {
    try {
      const meals = await Meal.findAll({
        include: [MealType, Ingredient],
        order: [['id', 'ASC']],
      })
      console.log(meals)

      return meals
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async exists(m: MealDTO): Promise<boolean> {
    const meal = await this.getMealById(m?.id as number)
    return !!meal.dataValues
  }
  async delete(id: number): Promise<string> {
    try {
      const rowNumber = await Meal.destroy({
        where: { id: id },
      })
      console.log(rowNumber)
      if (rowNumber) {
        return `Meal #${id} has been succesfully deleted`
      }
      throw new HttpException(
        404,
        `Meal with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async create(m: MealDTO): Promise<Meal> {
    try {
      const meal = await Meal.create({ ...m })
      let f = await meal.$get('mealType')
      return { ...meal.dataValues, mealType: f?.dataValues }
    } catch (error) {
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
  async update(id: number, m: MealDTO): Promise<Meal> {
    try {
      const meal = await Meal.findByPk(id)
      if (meal) {
        meal.set(m)
        await meal.save()
        console.log(meal)

        return meal.dataValues
      }

      throw new HttpException(
        404,
        `Meal with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(500, 'Internal server error', error as string)
    }
  }
}
