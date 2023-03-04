import { HttpUserRequest } from "@middlewares/makeIsAuthenticated"
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

type Middleware = (request: HttpUserRequest, response: HttpResponseFunction, next: HttpNextFunction) => Promise<void>

export default (middleware: Middleware) => async (req: Request, res: Response, next: NextFunction) => {
  req.headers = req.headers || {}

  await middleware(
    req,
    (response) => {
      res.status(response.statusCode).json(response.body)
    },
    next
  )
}
