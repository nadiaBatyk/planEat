import { UserDTOResponse } from '../DTOs/user.dto'
import { User } from '../models/User'
export class UserMap {
  public static toDTO(user: User): UserDTOResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}
