import { sequelize } from '../db/db'
import { DataTypes } from 'sequelize'
import { Meal } from './Meal'
import { Ingredient } from './Ingredient'

export const MealIngredient = sequelize.define('MealIngredient', {
  mealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Meal,
      key: 'id'
    }
  },
  ingredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Ingredient,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.FLOAT(4, 2),
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
})
