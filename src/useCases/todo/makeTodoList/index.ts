import { HttpResponse } from "@adapters/routeAdapter";
import { TodoDAO } from "@dataAccess/makeTodoDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeTodoListDependecies {
  todoDAO: TodoDAO
}

interface MakeTodoListQuery {
  page: string
  perPage: string
}

export default ({ todoDAO }: MakeTodoListDependecies) => {
  return async function getTodoList(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { page, perPage } = httpRequest.query as MakeTodoListQuery;

      const pagination = {
        page: Number(page),
        perPage: Number(perPage)
      }

      const todos = await todoDAO.findAll(userId, pagination);
      const todosLenght = await todoDAO.count(userId);

      const nbPages = Math.ceil(todosLenght / pagination.perPage);
      
      return {
        statusCode: 200,
        body: {
          data: todos,
          pagination: {
            page: pagination.page,
            perPage: pagination.perPage,
            nbPages: nbPages
          }
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