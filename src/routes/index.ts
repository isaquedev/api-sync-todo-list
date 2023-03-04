import { IRouter } from 'express';

import auth from './auth';
import entries from './entries';

const routes = (app: IRouter) => {
  app.use('/auth', auth)
  app.use('/entries', entries);
}

export default routes
