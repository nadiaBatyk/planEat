import { Query } from '../../../common/types/query.types'
import { UserDTORequest } from '../../DTOs/user.dto'
import { User } from '../../models/User'
import { BaseDao } from './baseDao.interface'

export interface IUserDao extends BaseDao<User> {
  getUserById(id: number): Promise<User>
  getUsers(query: Query): Promise<User[]>
  update(id: number, newUser: UserDTORequest): Promise<User>
}
