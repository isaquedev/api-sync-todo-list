import { HttpResponse } from "@adapters/routeAdapter";
import { TodoDAO } from "@dataAccess/makeTodoDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeTodoCreateDependecies {
  todoDAO: TodoDAO
}

interface PostTodoCreateBody {
  title: string
  date?: string
  isDone?: boolean
  priority?: number
}

export default ({ todoDAO }: MakeTodoCreateDependecies) => {
  return async function postTodoCreate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { title, date, isDone, priority } = httpRequest.body as PostTodoCreateBody;

      const todo = await todoDAO.create({
        title,
        date: date ? new Date(date) : null,
        isDone: isDone ?? false,
        priority: priority ?? null,
        userId,
      })
      
      return {
        statusCode: 200,
        body: {
          data: todo
        }
      }
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 400,
        body: {
          error: error.message
        }
      }
    }
  }
}