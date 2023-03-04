import express, { Express } from 'express';
// import mongoose from "mongoose"
import cors from 'cors'
import routes from './routes/index';

// import { redisConnection } from "@services/redis";
// import { log } from '@utils/log';

const server = async () => {
  const app: Express = express()
  app.use(express.json())
  app.use(cors({ origin: '*' }))

  const port = process.env.PORT ?? 3333

  routes(app)

  // mongoose.connect(process.env.MONGO_URL).then(() => {
  //   log.info('MongoDB connected')
  // }).catch(err => {
  //   log.error('MongoDB error: ', err)
  // })

  // redisConnection.connect()
  //   .then(() => {
  //     log.info("Redis Up")
  //   }).catch(log.error)

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
}

export default server
