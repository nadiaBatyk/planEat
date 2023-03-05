import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
  Is,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { MealIngredient } from './MealIngredient'
import { MeasureUnit } from '../../common/types/measureUnit.types'
/**
 * @openapi
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - unit
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           example: Rice
 *         unit:
 *           type: string
 *           enum:
 *             - unidades
 *             - cucharas de sopa
 *             - gramos
 *             - kilos
 *             - cm3
 *             - mililitros
 *             - litros
 *             - cucharas de te
 *             - tazas
 *             - rodajas
 *             - piezas
 *             - hojas
 *
 */
@Table({ timestamps: false })
export class Ingredient extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @AllowNull(false)
  @Is('validUnit', value => {
    if (!Object.keys(MeasureUnit).includes(value))
      throw new Error('not a valid optioon')
  })
  @Column(DataTypes.STRING(50))
  unit!: MeasureUnit

  @BelongsToMany(() => Meal, () => MealIngredient)
  meals!: Meal[]
}
