import bcrypt from "bcrypt"

export interface EncryptService {
  hash: (value: string) => Promise<string>
  compare: (value: string, hash: string) => Promise<boolean>
}

export default (): EncryptService => {
  async function hash (value: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(value, salt)
  }

  async function compare (value: string, hash: string) {
    return bcrypt.compare(value, hash)
  }

  return Object.freeze({
    hash,
    compare
  })
}