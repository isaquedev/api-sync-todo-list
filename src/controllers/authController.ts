
import { HttpRequest } from "@adapters/routeAdapter";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";
import { getWhoAmI, postLogin, postRegister } from "@useCases/auth";

export default Object.freeze({
  login: (request: HttpRequest) => postLogin(request),
  register: (request: HttpRequest) => postRegister(request),
  whoAmI: (request: HttpUserRequest) => getWhoAmI(request)
})
