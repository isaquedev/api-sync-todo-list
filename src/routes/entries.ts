import express from 'express';

import routeAdapter from '@adapters/routeAdapter';
import validateRequestAdapter from '@adapters/validateRequestAdapter';
import middlewareAdapter from '@adapters/middlewareAdapter';

import entriesController from '@controllers/entriesController';

import { isAuthenticated, validateRequest } from '@middlewares/index';

import { entryValidations } from '@models/entry';

const router = express.Router();

router.get("/", middlewareAdapter(isAuthenticated), routeAdapter(entriesController.getAll))
router.post("/",
  middlewareAdapter(isAuthenticated),
  validateRequestAdapter(validateRequest, entryValidations.changeValidation),
  routeAdapter(entriesController.create)
)
router.put("/:id",
  middlewareAdapter(isAuthenticated),
  validateRequestAdapter(validateRequest, entryValidations.changeValidation),
  routeAdapter(entriesController.update)
)
router.delete("/:id", middlewareAdapter(isAuthenticated), routeAdapter(entriesController.remove))

export default router
