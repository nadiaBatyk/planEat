import HttpException from '../../../common/error/HttpException'
import { MealDTORequest } from '../../DTOs/meal.dto'
import { MealFeatureDTORequest } from '../../DTOs/mealFeature.dto'
import { MealIngredientDTORequest } from '../../DTOs/mealIngredient.dto'
import { Feature } from '../../models/Feature'

import { Ingredient } from '../../models/Ingredient'
import { Meal } from '../../models/Meal'
import { MealFeature } from '../../models/MealFeature'
import { MealIngredient } from '../../models/MealIngredient'
import { IMealDao } from '../interfaces/mealDao.interface'

export class MealDao implements IMealDao {
  //MEAL CRUD
  getMealById = async (id: number): Promise<Meal> => {
    try {
      const meal = await Meal.findByPk(id, {
        include: [
          { model: Ingredient, through: { attributes: ['quantity'] } },
          { model: Feature, through: { attributes: ['value'] } },
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
          { model: Feature, through: { attributes: ['value'] } },
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
  create = async (m: MealDTORequest): Promise<Meal> => {
    try {
      const meal = await Meal.create({ ...m })
      return meal
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: MealDTORequest): Promise<Meal> => {
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
    mealId: number,
    mealIngredientReq: MealIngredientDTORequest
  ): Promise<Meal> => {
    try {
      const meal = await this.getMealById(mealId)
      if (meal) {
        await meal.$add('ingredient', mealIngredientReq.ingredientId, {
          through: {
            model: MealIngredient,
            quantity: mealIngredientReq.quantity,
          },
        })
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
        `Ingredient with id ${ingredientId} does not exist on meal #${mealId}`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  //MEAL_FEATURES CRUD

  addFeatureToMeal = async (
    mealId: number,
    mealFeatureReq: MealFeatureDTORequest
  ): Promise<Meal> => {
    try {
      const meal = await this.getMealById(mealId)
      if (meal) {
        await meal.$add('feature', mealFeatureReq.featureId, {
          through: {
            model: MealFeature,
            value: mealFeatureReq.value,
          },
        })
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
  getMealFeatureById = async (
    mealId: number,
    featureId: number
  ): Promise<Feature> => {
    try {
      const meal = await this.getMealById(mealId)
      const feature = meal.features.find(value => value.id === featureId)
      if (feature) {
        return feature
      }
      throw new HttpException(
        404,
        `Feature with id ${featureId} does not exist on meal #${mealId}`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  removeFeatureFromMeal = async (
    mealId: number,
    featureId: number
  ): Promise<Meal> => {
    try {
      const meal = await this.getMealById(mealId)
      if (meal) {
        await meal.$remove('feature', featureId)

        return await this.getMealById(mealId)
      }

      throw new HttpException(
        404,
        `Feature with id ${featureId} does not exist on meal #${mealId}`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
}
