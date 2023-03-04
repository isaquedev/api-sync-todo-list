import { HttpRequest, HttpResponse } from "@adapters/routeAdapter";
import { UserDAO } from "@dataAccess/makeUserDAO";
import { AuthService } from "@services/authService";
import { Validator } from "validations/validator";

interface MakeRegisterDependencies {
  userDAO: UserDAO
  authService: AuthService
  validator: Validator
}

interface PostRegisterBody {
  name: string
  email: string
  password: string
}

export default ({ userDAO, authService, validator }: MakeRegisterDependencies) => {
  return async function postRegister(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body as PostRegisterBody;

      //Add extra option to warranty that request body as exact the propriedades that we need
      const errors = validator<PostRegisterBody>(httpRequest.body, {
        name: { name: "Name", type: "string", required: true, min: 3, max: 255 },
        email: { name: "Email", type: "string", required: true, validations: ["email"] },
        password: { name: "Password", type: "string", required: true, validations: ["password"] },
      });

      if (errors) {
        return {
          statusCode: 400,
          body: {
            message: "Invalid request body",
            error: errors
          }
        }
      }

      const user = await userDAO.findByEmail(email);

      if (user !== null) {
        return {
          statusCode: 400,
          body: {
            message: "Email already in use"
          }
        }
      }

      const hashedPassword = await authService.hashPassword(password)

      const newUser = await userDAO.create({
        name,
        email,
        password: hashedPassword,
      })
      
      const token = await authService.login(newUser.id, newUser.email)
      
      return {
        statusCode: 200,
        body: {
          token: token
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