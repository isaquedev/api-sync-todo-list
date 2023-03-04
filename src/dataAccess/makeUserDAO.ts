import { PrismaClient, User } from "@prisma/client"

interface UserWithoutPassword extends Omit<User, "password"> {
  password?: string;
}

type UserCreate = {
  email: string;
  name: string;
  password: string;
}

export interface  UserDAO {
  findOne(id: string): Promise<UserWithoutPassword|null>
  findByEmail(email: string, withPassword?: boolean): Promise<User|UserWithoutPassword|null>
  create(data: UserCreate): Promise<UserWithoutPassword>
}

function exclude<User, Key extends keyof User>(
  user: User | null,
  keys: Key[]
): Omit<User, Key> | null {
  if (!user) {
    return user
  }
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export default (client: PrismaClient): UserDAO => {
  async function findOne(id: string) {
    const user = await client.user.findUnique({
      where: { id }
    })

    return exclude(user, ["password"])
  }

  async function findByEmail(email: string, withPassword?: boolean) {
    const user = await client.user.findUnique({
      where: { email }
    })

    if (withPassword) {
      return user
    }

    return exclude(user, ["password"])
  }

  async function create(data: UserCreate) {
    const user = await client.user.create({
      data
    })

    return exclude(user, ["password"])!
  }

  return Object.freeze({
    findOne,
    findByEmail,
    create
  })
}
