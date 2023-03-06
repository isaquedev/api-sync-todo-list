import { Todo, PrismaClient } from "@prisma/client"
import { Pagination } from "@utils/pagination"

interface TodoCreate extends Omit<Todo, "id"|"createdAt"|"updatedAt"> {}

interface TodoUpdate extends Omit<Todo, "id"|"createdAt"|"updatedAt"|"userId"> {}

export interface TodoDAO {
  findOne(id: string): Promise<Todo|null>
  findOneOfUser(id: string, userId: string): Promise<Todo|null>
  findAll(userId: string, paginate?: Pagination): Promise<Todo[]>
  count: (userId: string) => Promise<number>
  create(data: TodoCreate): Promise<Todo>
  update(id: string, data: TodoUpdate): Promise<Todo>
  remove(id: string): Promise<Todo>
}

export default (client: PrismaClient): TodoDAO => {

  function parseTodoOrNull(todo: Todo | null): Todo | null {
    if (!todo) return null
    return {
      ...todo
    }
  }

  function parseTodo(todo: Todo): Todo {
    return {
      ...todo
    }
  }

  async function findOne(id: string) {
    const todo =  await client.todo.findUnique({
      where: { id }
    })

    return parseTodoOrNull(todo)
  }

  async function findOneOfUser(id: string, userId: string) {
    const todo = await client.todo.findFirst({
      where: { 
        AND: [
          { id },
          { userId }
        ]
       }
    })

    return parseTodoOrNull(todo)
  }

  async function findAll(userId: string, pagination?: Pagination): Promise<Todo[]> {
    let todos: Todo[] = []

    if (pagination) {
      todos = await client.todo.findMany({
        where: {
          AND: [
            { userId }
          ]
        },
        skip: pagination.page * pagination.perPage,
        take: pagination.perPage
      })
    } else {
      todos = await client.todo.findMany({
        where: { userId }
      })
    }

    return todos.map(parseTodo)
  }

  async function count(userId: string): Promise<number> {
    return await client.todo.count({
      where: { userId }
    })
  }

  async function create(data: TodoCreate) {
    const todo = await client.todo.create({
      data
    })

    return parseTodo(todo)
  }

  async function update(id: string, data: TodoUpdate) {
    const todo = await client.todo.update({
      where: { id },
      data
    })

    return parseTodo(todo)
  }

  async function remove(id: string) {
    const todo = await client.todo.delete({
      where: { id }
    })

    return parseTodo(todo)
  }

  return Object.freeze({
    findOne,
    findOneOfUser,
    findAll,
    count,
    create,
    update,
    remove
  })
}
