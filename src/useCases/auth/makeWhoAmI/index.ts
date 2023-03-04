import { HttpResponse } from "@adapters/routeAdapter";
import { UserDAO } from "@dataAccess/makeUserDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeLoginDependencies {
  userDAO: UserDAO
}

export default ({ userDAO }: MakeLoginDependencies) => {
  return async function postLogin(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId

      const user = await userDAO.findOne(userId!)
      
      return {
        statusCode: 200,
        body: {
          user: user
        }
      }
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 400,
        body: {
          error: error.message
        }
      }
    }
  }
}