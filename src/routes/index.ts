import { IRouter } from 'express';

import auth from './auth';
import todo from './todo';

const routes = (app: IRouter) => {
  app.use('/auth', auth)
  app.use('/todos', todo);
}

export default routes
