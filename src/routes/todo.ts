import express from 'express';

import routeAdapter from '@adapters/routeAdapter';
import validateRequestAdapter from '@adapters/validateRequestAdapter';
import middlewareAdapter from '@adapters/middlewareAdapter';

import todosController from '@controllers/todosController';

import { isAuthenticated, validateRequest } from '@middlewares/index';

import { todoValidations } from '@models/todo';

const router = express.Router();

router.get("/", middlewareAdapter(isAuthenticated), routeAdapter(todosController.getAll))
router.post("/",
  middlewareAdapter(isAuthenticated),
  validateRequestAdapter(validateRequest, todoValidations.changeValidation),
  routeAdapter(todosController.create)
)
router.put("/:id",
  middlewareAdapter(isAuthenticated),
  validateRequestAdapter(validateRequest, todoValidations.changeValidation),
  routeAdapter(todosController.update)
)
router.delete("/:id", middlewareAdapter(isAuthenticated), routeAdapter(todosController.remove))

export default router
