import { authService } from "@services/index"
import validator from "@validations/validator";

import makeIsAuthenticated from "./makeIsAuthenticated"
import makeValidateRequest from "./makeValidateRequest";

const isAuthenticated = makeIsAuthenticated({
  authService: authService
})

const validateRequest = makeValidateRequest({
  validator: validator
})

export {
  isAuthenticated,
  validateRequest
}
