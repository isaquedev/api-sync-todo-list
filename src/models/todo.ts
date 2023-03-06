import { Todo } from "@prisma/client"
import { Validation } from "@validations/validator"

interface TodoChangeValidationFields extends Omit<Todo, "id" | "userId" | "createdAt" | "updatedAt"> {}

export type TodoChangeValidation = Validation<TodoChangeValidationFields>

interface ITodoModel {
  changeValidation: TodoChangeValidation
}

export const todoValidations: ITodoModel = {
  changeValidation: {
    title: { name: "Title", type: "string", required: true, min: 3, max: 255 },
    date: { name: "Date", type: "date" },
    isDone: { name: "Done", type: "boolean" },
    priority: { name: "Priority", type: "number", min: 1, max: 3 },
  }
}
