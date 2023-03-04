import { HttpResponseFunction } from "@adapters/middlewareAdapter";
import { HttpNextFunction, HttpRequest } from "@adapters/routeAdapter";
import { AuthService } from "@services/authService";

export interface HttpUserRequest extends HttpRequest {
  userId?: string
}

interface MakeIsAuthenticatedDependencies {
  authService: AuthService
}

interface IsAuthenticatedHeaders {
  authorization: string
}

export default ({ authService }: MakeIsAuthenticatedDependencies) => {
  return async function isAuthenticated(httpRequest: HttpUserRequest, httpResponse: HttpResponseFunction, httpNext: HttpNextFunction): Promise<void> {
    try {
      const { authorization } = httpRequest.headers as IsAuthenticatedHeaders;
      
      if (!authorization || authorization.split("Bearer ").length !== 2) {
        httpResponse({
          statusCode: 401,
          body: {
            error: "Not authorized"
          }
        })
      } else {
        const token = authorization.split("Bearer ")[1];

        const userId = await authService.verifyToken(token);

        httpRequest.userId = userId;

        return httpNext();
      }
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