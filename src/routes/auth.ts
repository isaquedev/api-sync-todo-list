import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import authController from '@controllers/authController';
import middlewareAdapter from '@adapters/middlewareAdapter';
import { isAuthenticated, validateRequest } from '@middlewares/index';
import validateRequestAdapter from '@adapters/validateRequestAdapter';
import { userValidations } from '@models/user'

const router = express.Router();

router.post("/login", validateRequestAdapter(validateRequest, userValidations.signInValidation), routeAdapter(authController.login))
router.post("/register", validateRequestAdapter(validateRequest, userValidations.signUpValidation), routeAdapter(authController.register))
router.get("/whoami", middlewareAdapter(isAuthenticated), routeAdapter(authController.whoAmI))
router.post("/reset", routeAdapter(authController.reset))
router.post("/recover", routeAdapter(authController.recover))

export default router
