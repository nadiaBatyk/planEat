import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
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
  @Column(
    DataTypes.ENUM(
      'unidades',
      'cucharas de sopa',
      'gramos',
      'kilos',
      'mililitros',
      'cm3',
      'litros',
      'cucharas de te',
      'tazas'
    )
  )
  unit!: MeasureUnit

  @BelongsToMany(() => Meal, () => MealIngredient)
  meals!: Meal[]
}
