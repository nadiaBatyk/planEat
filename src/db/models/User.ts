import { DataTypes } from 'sequelize'
import {
  AllowNull,
  Column,
  HasMany,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript'
import { Planner } from './Planner'

@Table({ timestamps: false })
export class User extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(20))
  name!: string

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column(DataTypes.STRING(50))
  email!: string

  @AllowNull(false)
  @Column(DataTypes.STRING(8))
  password!: string

  @HasMany(() => Planner)
  planners!: Planner[]
}
