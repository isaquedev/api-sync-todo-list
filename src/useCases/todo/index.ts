import { todoDAO } from "@dataAccess/index";

import makeTodoList from "./makeTodoList";
import makeTodoCreate from "./makeTodoCreate";
import makeTodoUpdate from "./makeTodoUpdate";
import makeTodoRemove from "./makeTodoRemove";

const getTodoList = makeTodoList({
  todoDAO
})

const postTodoCreate = makeTodoCreate({
  todoDAO
})

const putTodoUpdate = makeTodoUpdate({
  todoDAO
})

const deleteTodoRemove = makeTodoRemove({
  todoDAO
})

export {
  getTodoList,
  postTodoCreate,
  putTodoUpdate,
  deleteTodoRemove
}
