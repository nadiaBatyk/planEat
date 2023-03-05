import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { Ingredient } from './Ingredient'
/**
 * @openapi
 * components:
 *   schemas:
 *     MealIngredient:
 *       type: object
 *       required:
 *         - mealId
 *         - ingredientId
 *         - value
 *       properties:
 *         mealId:
 *           type: integer
 *           format: int64
 *         ingredientId:
 *           type: integer
 *           format: int64
 *         quantity:
 *           type: number
 *           format: float
 */
@Table({ timestamps: false })
export class MealIngredient extends Model {
  @ForeignKey(() => Meal)
  @Column
  mealId!: number

  @ForeignKey(() => Ingredient)
  @Column
  ingredientId!: number

  @AllowNull(false)
  @Column(DataTypes.FLOAT(4, 2))
  quantity!: number
}
