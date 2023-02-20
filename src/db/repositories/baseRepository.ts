import { Model, ModelCtor } from 'sequelize-typescript'
import HttpException from '../../common/error/HttpException'

export abstract class BaseRepository<M extends Model> {
  model: ModelCtor<M>
  constructor(model: ModelCtor<M>) {
    this.model = model
  }
  delete(m: Model<M>) {
    try {
      return this.model.destroy({
        where: { id: m.id.toString() },
      })
    } catch (error) {
      const err = new HttpException(500, error as string)
      throw err
    }
  }
}
