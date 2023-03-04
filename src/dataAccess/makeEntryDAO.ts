import { Entry, PrismaClient } from "@prisma/client"
import { Pagination } from "@utils/pagination"

interface EntryCreate extends Omit<Entry, "id"|"createdAt"|"updatedAt"> {}

interface EntryUpdate extends Omit<Entry, "id"|"createdAt"|"updatedAt"|"userId"> {}

export interface EntryDAO {
  findOne(id: string): Promise<Entry|null>
  findOneOfUser(id: string, userId: string): Promise<Entry|null>
  findAll(userId: string): Promise<Entry[]>
  findAllPaginated(userId: string, paginate: Pagination): Promise<Entry[]>
  count: (userId: string) => Promise<number>
  create(data: EntryCreate): Promise<Entry>
  update(id: string, data: EntryUpdate): Promise<Entry>
  remove(id: string): Promise<Entry>
}

export default (client: PrismaClient): EntryDAO => {

  function parseEntryOrNull(entry: Entry | null): Entry | null {
    if (!entry) return null
    return {
      ...entry
    }
  }

  function parseEntry(entry: Entry): Entry {
    return {
      ...entry
    }
  }

  async function findOne(id: string) {
    const entry =  await client.entry.findUnique({
      where: { id }
    })

    return parseEntryOrNull(entry)
  }

  async function findOneOfUser(id: string, userId: string) {
    const entry = await client.entry.findFirst({
      where: { 
        AND: [
          { id },
          { userId }
        ]
       }
    })

    return parseEntryOrNull(entry)
  }

  async function findAll(userId: string): Promise<Entry[]> {
    const entries = await client.entry.findMany({
      where: { userId }
    })

    return entries.map(parseEntry)
  }

  async function findAllPaginated(userId: string, pagination: Pagination): Promise<Entry[]> {
    const entries = await client.entry.findMany({
      where: {
        AND: [
          { userId }
        ]
      },
      skip: pagination.page * pagination.perPage,
      take: pagination.perPage
    })

    return entries.map(parseEntry)
  }

  async function count(userId: string): Promise<number> {
    return await client.entry.count({
      where: { userId }
    })
  }

  async function create(data: EntryCreate) {
    const entry = await client.entry.create({
      data
    })

    return parseEntry(entry)
  }

  async function update(id: string, data: EntryUpdate) {
    const entry = await client.entry.update({
      where: { id },
      data
    })

    return parseEntry(entry)
  }

  async function remove(id: string) {
    const entry = await client.entry.delete({
      where: { id }
    })

    return parseEntry(entry)
  }

  return Object.freeze({
    findOne,
    findOneOfUser,
    findAll,
    findAllPaginated,
    count,
    create,
    update,
    remove
  })
}
