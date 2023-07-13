import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
import { MealDTORequest } from '../../DTOs/meal.dto'
import { MealFeatureDTORequest } from '../../DTOs/mealFeature.dto'
import { MealIngredientDTORequest } from '../../DTOs/mealIngredient.dto'
import { Feature } from '../../models/Feature'

import { Ingredient } from '../../models/Ingredient'
import { Meal } from '../../models/Meal'
import { MealFeature } from '../../models/MealFeature'
import { MealIngredient } from '../../models/MealIngredient'
import { IMealDao } from '../interfaces/mealDao.interface'
import { IngredientDao } from './ingredient.dao'

export class MealDao implements IMealDao {
  ingredientDao: IngredientDao
  constructor() {
    this.ingredientDao = new IngredientDao()
  }
  //MEAL CRUD
  getMealById = async (id: number): Promise<Meal> => {
    try {
      const meal = await Meal.findByPk(id)
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

  getMeals = async (query: Query): Promise<Meal[]> => {
    try {
      const meals = await Meal.findAll({
        order: [[query.orderBy, query.direction]],

        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })
      return meals
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      await this.getMealById(id)
      await Meal.destroy({
        where: { id: id },
      })
      return `Meal #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (newMeal: MealDTORequest): Promise<Meal> => {
    try {
      const meal = await Meal.create({ ...newMeal })
      return meal
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, newMeal: MealDTORequest): Promise<Meal> => {
    try {
      const meal = await this.getMealById(id)
      meal.set(newMeal)
      await meal.save()
      return meal
    } catch (error) {
      throw error
    }
  }

  //MEAL_INGREDIENTS CRUD

  getMealIngredients = async (
    id: number,
    query: Query
  ): Promise<Ingredient[]> => {
    try {
      const meal = await this.getMealById(id)
      return await meal.$get('ingredients', {
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })
    } catch (error) {
      throw error
    }
  }
  addIngredientToMeal = async (
    mealId: number,
    mealIngredientReq: MealIngredientDTORequest
  ): Promise<MealIngredient> => {
    try {
      const meal = await this.getMealById(mealId)
      await this.ingredientDao.getIngredientById(mealIngredientReq.ingredientId)
      await meal.$add('ingredient', mealIngredientReq.ingredientId, {
        through: {
          model: MealIngredient,
          quantity: mealIngredientReq.quantity,
        },
      })
      return this.getMealIngredientById(mealId, mealIngredientReq.ingredientId)
    } catch (error) {
      throw error
    }
  }
  getMealIngredientById = async (
    mealId: number,
    ingredientId: number
  ): Promise<MealIngredient> => {
    try {
      await this.getMealById(mealId)
      await this.ingredientDao.getIngredientById(ingredientId)
      const mealIngredient = await MealIngredient.findOne({
        where: {
          ingredientId: ingredientId,
          mealId: mealId,
        },
      })
      if (mealIngredient) {
        return mealIngredient
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
  ): Promise<string> => {
    try {
      const mealIngredient = await this.getMealIngredientById(
        mealId,
        ingredientId
      )
      await mealIngredient.$remove('ingredient', ingredientId)
      return `Ingredient with id #${ingredientId} has been succesfully deleted from Meal #${mealId}`
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
  getMealFeatures = async (id: number, query: Query): Promise<Feature[]> => {
    try {
      const meal = await this.getMealById(id)
      if (meal) {
        return await meal.$get('features', {
          order: [[query.orderBy, query.direction]],
          limit: query.pageSize,
          offset: (query.pageNumber - 1) * query.pageSize,
        })
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
