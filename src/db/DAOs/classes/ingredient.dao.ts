import HttpException from '../../../common/error/HttpException'
import { IngredientDTO } from '../../DTOs/ingredient.dto'
import { Ingredient } from '../../models/Ingredient'
import { IIngredientDao } from '../interfaces/ingredientDao.interface'

export class IngredientDao implements IIngredientDao {
  getIngredientById = async (id: number): Promise<Ingredient> => {
    try {
      const ingredient = await Ingredient.findByPk(id)
      if (ingredient) {
        return ingredient?.dataValues
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
  getIngredients = async (): Promise<Ingredient[]> => {
    try {
      const ingredients = await Ingredient.findAll({
        order: [['id', 'ASC']],
      })
      return ingredients
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      const rowNumber = await Ingredient.destroy({
        where: { id: id },
      })
      if (rowNumber) {
        return `Ingredient #${id} has been succesfully deleted`
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
  create = async (ingredient: IngredientDTO): Promise<Ingredient> => {
    try {
      const newIngredient = await Ingredient.create({ ...ingredient })
      return newIngredient.dataValues
    } catch (error) {
      throw error
    }
  }
  update = async (
    id: number,
    ingredient: IngredientDTO
  ): Promise<Ingredient> => {
    try {
      const currentIngredient = await Ingredient.findByPk(id)
      if (currentIngredient) {
        currentIngredient.set(ingredient)
        await currentIngredient.save()
        return currentIngredient.dataValues
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
}
