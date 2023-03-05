import { HttpRequest, HttpResponse } from "@adapters/routeAdapter";
import { UserDAO } from "@dataAccess/makeUserDAO";
import { AuthService } from "@services/authService";
import { MailService } from "@services/mailService";
import { mailResetPasswordTemplate } from "@emails/mailResetPasswordTemplate";

interface MakeResetMailDependencies {
  userDAO: UserDAO
  authService: AuthService
  mailService: MailService
}

interface PostResetMailBody {
  email: string
}

export default ({ userDAO, authService, mailService }: MakeResetMailDependencies) => {
  return async function postResetMail(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body as PostResetMailBody;

      const user = await userDAO.findByEmail(email, true);

      if (!user) {
        return {
          statusCode: 404,
          body: {
            error: "Account not found"
          }
        }
      }

      const token = await authService.createResetToken(user.id)

      const result = await mailService.send(email, mailResetPasswordTemplate(token))

      if (!result) {
        return {
          statusCode: 500,
          body: {
            error: "Could not send reset email"
          }
        }
      }

      await userDAO.update(user.id, {
        ...user,
        recoveryToken: token
      })
      
      return {
        statusCode: 200,
        body: {}
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