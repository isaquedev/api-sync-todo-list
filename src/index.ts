import dotenv from "dotenv"
import "module-alias/register";

dotenv.config()

import server from './server';

process.on('uncaughtException', (error, origin) => {
  // log.error('----- Uncaught exception -----')
  console.error(error)
  // log.error('----- Exception origin -----')
  // log.error(origin)
})

server()
