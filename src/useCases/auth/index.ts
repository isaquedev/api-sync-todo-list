import { userDAO } from "@dataAccess/index";

import { authService, mailService } from "@services/index";

import validator from "@validations/validator";

import makeLogin from "./makeLogin";
import makeRegister from "./makeRegister";
import makeWhoAmI from "./makeWhoAmI";
import makeResetMail from "./makeResetMail";
import makeRecoverAccount from "./makeRecoverAccount";

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

const postResetMail = makeResetMail({
  userDAO,
  authService,
  mailService
})

const postRecoverAccount = makeRecoverAccount({
  userDAO,
  authService,
  validator
})

export {
  postLogin,
  postRegister,
  getWhoAmI,
  postResetMail,
  postRecoverAccount
}
