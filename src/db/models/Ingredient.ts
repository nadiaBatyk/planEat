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

@Table({ timestamps: false })
export class Ingredient extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @AllowNull(false)
  @Is('validUnit', value => {
    const units: MeasureUnit[] = [
      'unidades',
      'cucharas de sopa',
      'gramos',
      'kilos',
      'mililitros',
      'cm3',
      'litros',
      'cucharas de te',
      'tazas',
      'rodajas',
      'piezas',
    ]
    if (!units.includes(value)) throw new Error('not a valid optioon')
  })
  @Column(DataTypes.STRING(50))
  unit!: MeasureUnit

  @BelongsToMany(() => Meal, () => MealIngredient)
  meals!: Meal[]
}
