import { HttpResponseFunction } from "@adapters/middlewareAdapter";
import { HttpNextFunction, HttpRequest } from "@adapters/routeAdapter";
import { Validation, Validator } from "@validations/validator";

interface MakeValidateRequestDependencies {
  validator: Validator
}

export default ({ validator }: MakeValidateRequestDependencies) => {
  return function validateRequest(httpRequest: HttpRequest, httpResponse: HttpResponseFunction, httpNext: HttpNextFunction): (validationRules: Validation<Object>) => Promise<void> {
    return async function validateRequestMiddleware<Body>(validationRules: Validation<Body>) {
      try {
        const errors = validator<Body>(httpRequest.body, validationRules)
  
        if (errors) {
          httpResponse({
            statusCode: 400,
            body: {
              message: "Invalid request body",
              error: errors
            }
          })
        }
        return httpNext();
      } catch (error: any) {
        console.error(error);
        httpResponse({
          statusCode: 401,
          body: {
            error: "Not authorized"
          }
        })
      }
    }
  }
}