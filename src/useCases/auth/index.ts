import { userDAO } from "@dataAccess/index";
import { authService } from "@services/index";
import validator from "@validations/validator";

import makeLogin from "./makeLogin";
import makeRegister from "./makeRegister";
import makeWhoAmI from "./makeWhoAmI";

const postLogin = makeLogin({
  userDAO,
  authService,
})

const postRegister = makeRegister({
  userDAO,
  authService,
  validator
})

const getWhoAmI = makeWhoAmI({
  userDAO,
})

export {
  postLogin,
  postRegister,
  getWhoAmI,
}
