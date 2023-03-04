import { HttpUserRequest } from "@middlewares/makeIsAuthenticated"
import { NextFunction, Request, Response } from "express"

type Controller = (request: HttpUserRequest, next?: HttpNextFunction) => Promise<HttpResponse>

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

export default (controller: Controller) => async (req: Request, res: Response, next: NextFunction) => {
  req.headers = req.headers || {}
  
  const httpsResponse = await controller(req, next)

  if (httpsResponse.body) {
    return res.status(httpsResponse.statusCode).json(httpsResponse.body)
  }
  return res.status(httpsResponse.statusCode).json()
}
