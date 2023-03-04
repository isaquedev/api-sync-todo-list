import { HttpUserRequest } from "@middlewares/makeIsAuthenticated"
import { Validation } from "@validations/validator"
import { NextFunction, Request, Response } from "express"

export interface HttpRequest {
  body: any
  query: any
  headers: any
  params: any
}

export interface HttpResponse {
  statusCode: number
  body?: Object
}

export type HttpNextFunction = (error?: Error) => void
export type HttpResponseFunction = (response: HttpResponse) => void

type ValidationRequestResult = (validationRules: Validation<Object>) => void
type ValidationRequest = (request: HttpUserRequest, response: HttpResponseFunction, next: HttpNextFunction) => ValidationRequestResult

export default (validationRequest: ValidationRequest, validationRules: Validation<Object>) => (req: Request, res: Response, next: NextFunction) => {
  req.headers = req.headers || {}

  const call = validationRequest(
    req,
    (response) => {
      res.status(response.statusCode).json(response.body)
    },
    next
  )

  call(validationRules)
}
