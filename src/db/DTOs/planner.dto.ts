/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         finishDate:
 *           type: string
 *           format: date
 *         userId:
 *           type: integer
 */
export interface PlannerDTOResponse {
  id?: number
  name: string
  startDate: Date
  finishDate: Date
  userId: number
}
/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerDTORequest:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - finishDate
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           example: Meal prep for the week
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2023-01-01
 *         finishDate:
 *           type: string
 *           format: date
 *           example: 2023-01-10
 *         userId:
 *           type: integer
 *           example: 2
 */
export type PlannerDTORequest = Omit<
  PlannerDTOResponse,
  'plannerEntries' | 'id'
>

/**
 * @openapi
 * components:
 *   parameters:
 *     plannerFilter:
 *         name: filter
 *         in: query
 *         schema:
 *           $ref: "#/components/schemas/PlannerDTOResponse"
 *     plannerId:
 *         name: plannerId
 *         in: path
 *         description: ID of planner to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
