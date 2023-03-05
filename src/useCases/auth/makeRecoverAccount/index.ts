import { HttpRequest, HttpResponse } from "@adapters/routeAdapter";
import { UserDAO } from "@dataAccess/makeUserDAO";
import { AuthService } from "@services/authService";
import { MailService } from "@services/mailService";
import { mailResetPasswordTemplate } from "@emails/mailResetPasswordTemplate";
import { Validator } from "@validations/validator";

interface MakeRecoverAccountDependencies {
  userDAO: UserDAO
  authService: AuthService
  validator: Validator
}

interface PostRecoverAccountlBody {
  token: string
  password: string
}

export default ({ userDAO, authService, validator }: MakeRecoverAccountDependencies) => {
  return async function postRecoverAccount(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token, password } = httpRequest.body as PostRecoverAccountlBody;

      const errors = validator<Omit<PostRecoverAccountlBody, "token">>(httpRequest.body, {
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

      let userId: string | null = null

      try {
        userId = await authService.verifyResetToken(token)
      } catch (error) {
        console.log("Failed to verify recover account token", token, error)
      }
      
      if (!userId) {
        return {
          statusCode: 400,
          body: {
            error: "Invalid token"
          }
        }
      }

      const user = await userDAO.findOne(userId);

      if (!user) {
        return {
          statusCode: 404,
          body: {
            error: "Account not found"
          }
        }
      }

      if (user.recoveryToken !== token) {
        return {
          statusCode: 400,
          body: {
            error: "Invalid secret"
          }
        }
      }

      const hashedPassword = await authService.hashPassword(password)

      await userDAO.update(user.id, {
        ...user,
        password: hashedPassword,
        recoveryToken: null
      })

      const newToken = await authService.login(user.id, user.email)
      
      return {
        statusCode: 200,
        body: {
          token: newToken
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