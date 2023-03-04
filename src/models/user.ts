import { User } from "@prisma/client"
import { Validation } from "@validations/validator"

interface UserSignInFields extends Omit<User, "id" | "name" | "createdAt" | "updatedAt"> {}
interface UserSignUpFields extends Omit<User, "id" | "createdAt" | "updatedAt"> {}

export type UserSignInValidation = Validation<UserSignInFields>
export type UserSignUpValidation = Validation<UserSignUpFields>

interface IUserModel {
  signInValidation: UserSignInValidation
  signUpValidation: UserSignUpValidation
}

const signInValidation: UserSignInValidation = {
  email: { name: "E-mail", type: "string", required: true, min: 8, max: 255, validations: ["email"] },
  password: { name: "Senha", type: "string", required: true, min: 8, max: 255, validations: ["password"] },
}

export const userValidations: IUserModel = {
  signInValidation: signInValidation,
  signUpValidation: {
    ...signInValidation,
    name: { name: "Nome", type: "string", required: true, min: 3, max: 255 },
  }
}
