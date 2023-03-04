import express, { Express } from 'express';
import cors from 'cors'
import routes from './routes/index';

const server = async () => {
  const app: Express = express()
  app.use(express.json())
  app.use(cors({ origin: '*' }))

  const port = process.env.PORT ?? 3333

  routes(app)

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
}

export default server
