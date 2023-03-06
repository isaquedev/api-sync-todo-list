import prisma from "../database";

import makeTodoDAO from "./makeTodoDAO";
import makeUserDAO from "./makeUserDAO";

const todoDAO = makeTodoDAO(prisma)
const userDAO = makeUserDAO(prisma)

export {
  todoDAO,
  userDAO
}
