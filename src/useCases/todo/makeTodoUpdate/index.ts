import { HttpResponse } from "@adapters/routeAdapter";
import { TodoDAO } from "@dataAccess/makeTodoDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeTodoUpdateDependecies {
  todoDAO: TodoDAO
}

interface PutTodoUpdateParams {
  id: string
}

interface PutTodoUpdateBody {
  title: string
  date?: string
  isDone?: boolean
  priority?: number
}

export default ({ todoDAO }: MakeTodoUpdateDependecies) => {
  return async function putTodoUpdate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { title, date, isDone, priority } = httpRequest.body as PutTodoUpdateBody;
      const { id: todoId } = httpRequest.params as PutTodoUpdateParams;

      const todo = await todoDAO.findOneOfUser(todoId, userId);

      if (!todo) {
        return {
          statusCode: 404,
          body: {
            message: "Todo not found"
          }
        }
      }

      const updatedTodo = await todoDAO.update(todoId, { 
        title,
        date: date ? new Date(date) : null,
        isDone: isDone ?? false,
        priority: priority ?? null,
      })
      
      return {
        statusCode: 200,
        body: {
          data: updatedTodo
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