import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
import { IngredientDTORequest } from '../../DTOs/ingredient.dto'
import { Ingredient } from '../../models/Ingredient'
import { IIngredientDao } from '../interfaces/ingredientDao.interface'

export class IngredientDao implements IIngredientDao {
  getIngredientById = async (id: number): Promise<Ingredient> => {
    try {
      const ingredient = await Ingredient.findByPk(id)
      if (ingredient) {
        return ingredient
      }
      throw new HttpException(
        404,
        `Ingredient with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getIngredients = async (query: Query): Promise<Ingredient[]> => {
    try {
      const ingredients = await Ingredient.findAll({
        where: query.filter,
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })
      return ingredients
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      await this.getIngredientById(id)
      await Ingredient.destroy({
        where: { id: id },
      })
      return `Ingredient #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (ingredient: IngredientDTORequest): Promise<Ingredient> => {
    try {
      const newIngredient = await Ingredient.create({ ...ingredient })
      return newIngredient
    } catch (error) {
      throw error
    }
  }
  update = async (
    id: number,
    ingredient: IngredientDTORequest
  ): Promise<Ingredient> => {
    try {
      const currentIngredient = await this.getIngredientById(id)
      currentIngredient.set(ingredient)
      await currentIngredient.save()
      return currentIngredient
    } catch (error) {
      throw error
    }
  }
}
