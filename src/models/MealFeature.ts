import { sequelize } from '../db/db'
import { DataTypes } from 'sequelize'
import { Meal } from './Meal'
import { Feature } from './Feature'

export const MealFeature = sequelize.define('MealFeatures', {
  MealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'mealId',
    references: {
      model: Meal,
      key: 'id'
    }
  },
  FeatureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'featureId',
    references: {
      model: Feature,
      key: 'id'
    }
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false })
