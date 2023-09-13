import { PlannerDTOResponse } from './planner.dto'

/**
 * @openapi
 * components:
 *   schemas:
 *     UserDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         planners:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PlannerDTOResponse'
 *
 */
export interface UserDTOResponse {
  id?: number
  name: string
  email: string
  planners?: Array<PlannerDTOResponse>
}
/**
 * @openapi
 * components:
 *   schemas:
 *     UserDTORequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Nadia
 *         email:
 *           type: string
 *           format: email
 *           example: nadia@mail.com
 *         password:
 *           type: string
 *           example: 1234
 */
export type UserDTORequest = Omit<UserDTOResponse, 'planners' | 'id'>

/**
 * @openapi
 * components:
 *   parameters:
 *     userFilter:
 *         name: filter
 *         in: query
 *         schema:
 *           $ref: "#/components/schemas/UserDTOResponse"
 *     userId:
 *         name: userId
 *         in: path
 *         description: ID of user to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
