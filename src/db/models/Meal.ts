import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript'
import { MealType } from './MealType'
import { Ingredient } from './Ingredient'
import { MealIngredient } from './MealIngredient'
import { Feature } from './Feature'
import { MealFeature } from './MealFeature'

/**
 * @openapi
 * components:
 *   schemas:
 *     Meal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           example: Fideos con tuco
 *         mealTypeId:
 *           type: integer
 */
@Table({ timestamps: false })
export class Meal extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @ForeignKey(() => MealType)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  mealTypeId!: number

  @BelongsTo(() => MealType)
  mealType!: MealType

  @BelongsToMany(() => Ingredient, () => MealIngredient)
  ingredients!: Ingredient[]

  @BelongsToMany(() => Feature, () => MealFeature)
  features!: Feature[]
}
