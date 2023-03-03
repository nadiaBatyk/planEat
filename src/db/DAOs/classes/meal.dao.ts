import HttpException from '../../../common/error/HttpException'
import { MealDTO } from '../../DTOs/meal.dto'
import { MealIngredientDTO } from '../../DTOs/mealIngredient.dto'
import { Feature } from '../../models/Feature'

import { Ingredient } from '../../models/Ingredient'
import { Meal } from '../../models/Meal'
import { MealIngredient } from '../../models/MealIngredient'
import { MealType } from '../../models/MealType'
import { IMealDao } from '../interfaces/mealDao.interface'

export class MealDao implements IMealDao {
  //MEAL CRUD
  getMealById = async (id: number): Promise<Meal> => {
    try {
      const meal = await Meal.findByPk(id, {
        include: [
          { model: Ingredient, through: { attributes: ['quantity'] } },
          { model: MealType, attributes: ['name'] },
          Feature,
        ],
      })
      if (meal) {
        return meal
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

  getMeals = async (): Promise<Meal[]> => {
    try {
      const meals = await Meal.findAll({
        include: [
          { model: Ingredient, through: { attributes: ['quantity'] } },
          { model: MealType, attributes: ['name'] },
        ],
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
        return meal
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

  //MEAL_INGREDIENTS CRUD

  addIngredientToMeal = async (
    mealIngredient: MealIngredientDTO
  ): Promise<Meal> => {
    try {
      const meal = await this.getMealById(mealIngredient.mealId)
      if (meal) {
        await meal.$add('ingredient', mealIngredient.ingredientId, {
          through: {
            model: MealIngredient,
            quantity: mealIngredient.quantity,
          },
        })
        return await this.getMealById(mealIngredient.mealId)
      }

      throw new HttpException(
        404,
        `Meal with id ${mealIngredient.mealId} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getMealIngredientById = async (
    mealId: number,
    ingredientId: number
  ): Promise<Ingredient> => {
    try {
      const meal = await this.getMealById(mealId)
      const ingredient = meal.ingredients.find(
        value => value.id === ingredientId
      )
      if (ingredient) {
        return ingredient
      }
      throw new HttpException(
        404,
        `Ingredient with id ${ingredientId} does not exist on meal #${mealId}`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  removeIngredientFromMeal = async (
    mealId: number,
    ingredientId: number
  ): Promise<Meal> => {
    try {
      const meal = await this.getMealById(mealId)
      if (meal) {
        await meal.$remove('ingredient', ingredientId)

        return await this.getMealById(mealId)
      }

      throw new HttpException(
        404,
        `Meal with id ${mealId} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  //MEAL_FEATURES CRUD

  addFeatureToMeal = async () => {}
}
