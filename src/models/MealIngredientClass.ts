import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../db/db'
import { Feature } from './FeatureClass'
import { Meal } from './MealClass'

export class MealIngredient extends Model<InferAttributes<MealIngredient>, InferCreationAttributes<MealIngredient>> {
  declare mealId: ForeignKey<Meal['id']>
  declare ingredientId: ForeignKey<Feature['id']>
  declare quantity: number
}
MealIngredient.init({
  mealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'mealId',
    references: {
      model: 'Meals',
      key: 'id'
    }
  },
  ingredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ingredientId',
    references: {
      model: 'Ingredients',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.FLOAT(4, 2),
    allowNull: false
  }
},
{ sequelize, timestamps: false })
