import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'
import { Express, Response, Request } from 'express'

const options: swaggerJsdoc.Options = {
  definition: {
    info: {
      title: 'PlanEat API Docs',
      version,
    },
    openapi: '3.0.0',
  },
  apis: ['../routes/*.ts'],
}
const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number) {
  //swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  //docs in JSON format
  app.get('/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(`DOCS IN PORT ${port}`)
}
export default swaggerDocs
