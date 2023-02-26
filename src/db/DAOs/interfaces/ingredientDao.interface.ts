import { Ingredient } from '../../models/Ingredient'
import { BaseDao } from './baseDao.interface'

export interface IIngredientDao extends BaseDao<Ingredient> {
  getIngredientById(id: number): Promise<Ingredient>
  getIngredients(): Promise<Ingredient[]>
}
