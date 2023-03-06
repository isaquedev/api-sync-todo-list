import { HttpResponse } from "@adapters/routeAdapter";
import { TodoDAO } from "@dataAccess/makeTodoDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeTodoRemoveDependecies {
  todoDAO: TodoDAO
}

interface DeleteTodoRemoveParams {
  id: string
}

export default ({ todoDAO }: MakeTodoRemoveDependecies) => {
  return async function deleteTodoRemove(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { id: todoId } = httpRequest.params as DeleteTodoRemoveParams;

      const todo = await todoDAO.findOneOfUser(todoId, userId);

      if (!todo) {
        return {
          statusCode: 404,
          body: {
            message: "Todo not found"
          }
        }
      }

      await todoDAO.remove(todoId)
      
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