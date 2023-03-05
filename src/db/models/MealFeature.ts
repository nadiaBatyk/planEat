import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { Feature } from './Feature'
/**
 * @openapi
 * components:
 *   schemas:
 *     MealFeature:
 *       type: object
 *       required:
 *         - mealId
 *         - featureId
 *         - value
 *       properties:
 *         mealId:
 *           type: integer
 *           format: int64
 *         featureId:
 *           type: integer
 *           format: int64
 *         value:
 *           type: string
 *           example: instrucciones de la receta
 */
@Table({ timestamps: false })
export class MealFeature extends Model {
  @ForeignKey(() => Meal)
  @Column
  mealId!: number

  @ForeignKey(() => Feature)
  @Column
  featureId!: number

  @AllowNull(false)
  @Column(DataTypes.STRING)
  value!: string
}
