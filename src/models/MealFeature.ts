import { sequelize } from '../db/db'
import { DataTypes } from 'sequelize'
import { Meal } from './Meal'
import { Feature } from './Feature'

export const MealFeature = sequelize.define('MealFeature', {
  mealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Meal,
      key: 'id'
    }
  },
  featureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Feature,
      key: 'id'
    }
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
