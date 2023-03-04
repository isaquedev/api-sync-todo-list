import prisma from "../database";

import makeEntryDAO from "./makeEntryDAO";
import makeUserDAO from "./makeUserDAO";

const entryDAO = makeEntryDAO(prisma)
const userDAO = makeUserDAO(prisma)

export {
  entryDAO,
  userDAO
}
