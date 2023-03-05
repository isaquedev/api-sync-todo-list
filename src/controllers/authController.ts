
import { HttpRequest } from "@adapters/routeAdapter";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";
import { getWhoAmI, postLogin, postRecoverAccount, postRegister, postResetMail } from "@useCases/auth";

export default Object.freeze({
  login: (request: HttpRequest) => postLogin(request),
  register: (request: HttpRequest) => postRegister(request),
  whoAmI: (request: HttpUserRequest) => getWhoAmI(request),
  reset: (request: HttpUserRequest) => postResetMail(request),
  recover: (request: HttpUserRequest) => postRecoverAccount(request),
})
