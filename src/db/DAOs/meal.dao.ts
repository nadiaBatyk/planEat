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
      throw error
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
      throw error
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
      throw error
    }
  }
  async create(m: MealDTO): Promise<Meal> {
    try {
      const meal = await Meal.create({ ...m })
      let f = await meal.$get('mealType')
      return { ...meal.dataValues, mealType: f?.dataValues }
    } catch (error) {
      throw error
    }
  }
  async update(id: number, m: MealDTO): Promise<Meal> {
    try {
      const meal = await Meal.findByPk(id)
      if (meal) {
        meal.set(m)
        await meal.save()
        return meal.dataValues
      }

      throw new HttpException(
        404,
        `Meal with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
}
