import HttpException from '../../../common/error/HttpException'
import { MealDTORequest } from '../../DTOs/meal.dto'
import { MealFeatureDTO } from '../../DTOs/mealFeature.dto'
import { MealIngredientDTO } from '../../DTOs/mealIngredient.dto'
import { Feature } from '../../models/Feature'

import { Ingredient } from '../../models/Ingredient'
import { Meal } from '../../models/Meal'
import { MealFeature } from '../../models/MealFeature'
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
          { model: MealType, attributes: ['name'] },
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
      let f = await meal.$get('mealType')
      return { ...meal.dataValues, mealType: f?.dataValues }
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
        `Ingredient with id ${ingredientId} does not exist on meal #${mealId}`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  //MEAL_FEATURES CRUD

  addFeatureToMeal = async (mealFeature: MealFeatureDTO): Promise<Meal> => {
    try {
      const meal = await this.getMealById(mealFeature.mealId)
      if (meal) {
        await meal.$add('feature', mealFeature.featureId, {
          through: {
            model: MealFeature,
            value: mealFeature.value,
          },
        })
        return await this.getMealById(mealFeature.mealId)
      }

      throw new HttpException(
        404,
        `Meal with id ${mealFeature.mealId} does not exist`,
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
