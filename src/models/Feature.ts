import { sequelize } from '../db/db'
import { DataTypes } from 'sequelize'

export const Feature = sequelize.define('Feature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  }
})
