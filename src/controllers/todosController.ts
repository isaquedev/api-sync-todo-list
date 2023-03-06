import { deleteTodoRemove, getTodoList, postTodoCreate, putTodoUpdate } from "@useCases/todo";
import { HttpRequest } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: (request: HttpRequest) => getTodoList(request),
  create: (request: HttpRequest) => postTodoCreate(request),
  update: (request: HttpRequest) => putTodoUpdate(request),
  remove: (request: HttpRequest) => deleteTodoRemove(request),
})
