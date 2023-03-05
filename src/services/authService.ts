import { EncryptService } from '@services/encryptService';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  iat: number
  userId: string
}

export interface AuthService {
  login: (id: string, email: string) => Promise<string>
  hashPassword: (password: string) => Promise<string>
  comparePasswords: (password: string, hashedPassword: string) => Promise<boolean>
  verifyToken: (token: string) => Promise<string>
  createResetToken: (id: string) => Promise<string>
  verifyResetToken: (token: string) => Promise<string>
}

interface AuthServiceDependencies {
  encryptService: EncryptService
}

export default ({ encryptService }: AuthServiceDependencies): AuthService => {
  async function login (id: string, email: string) {
    return jwt.sign({ userId: id, email }, process.env.JWT_AUTH_SECRET)
  }

  async function verifyToken (token: string) {
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET) as DecodedToken
    return decoded.userId
  }

  async function hashPassword (password: string) {
    return encryptService.hash(password)
  }

  async function comparePasswords (password: string, hashedPassword: string) {
    return encryptService.compare(password, hashedPassword)
  }

  async function createResetToken (id: string) {
    return jwt.sign({ userId: id }, process.env.JWT_RESET_SECRET, { expiresIn: '30m' })
  }

  async function verifyResetToken (token: string) {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET) as DecodedToken
    return decoded.userId
  }

  return Object.freeze({
    login,
    verifyToken,
    hashPassword,
    comparePasswords,
    createResetToken,
    verifyResetToken
  })
}
