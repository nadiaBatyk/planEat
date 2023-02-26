import HttpException from '../../../common/error/HttpException'
import { MealDTO } from '../../DTOs/meal.dto'

import { Ingredient } from '../../models/Ingredient'
import { Meal } from '../../models/Meal'
import { MealType } from '../../models/MealType'
import { IMealDao } from '../interfaces/mealDao.interface'

export class MealDao implements IMealDao {
  getMealById = async (id: number): Promise<Meal> => {
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
  getMealIngredients = async (id: number): Promise<Ingredient[]> => {
    try {
      const meal = await this.getMealById(id)
      return meal.ingredients
    } catch (error) {
      throw error
    }
  }
  getMeals = async (): Promise<Meal[]> => {
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
  delete = async (id: number): Promise<string> => {
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
  create = async (m: MealDTO): Promise<Meal> => {
    try {
      const meal = await Meal.create({ ...m })
      let f = await meal.$get('mealType')
      return { ...meal.dataValues, mealType: f?.dataValues }
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: MealDTO): Promise<Meal> => {
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
