import { Entry } from "@prisma/client"
import { Validation } from "@validations/validator"

interface EntryChangeValidationFields extends Omit<Entry, "id" | "userId" | "createdAt" | "updatedAt"> {}

export type EntryChangeValidation = Validation<EntryChangeValidationFields>

interface IEntryModel {
  changeValidation: EntryChangeValidation
}

export const entryValidations: IEntryModel = {
  changeValidation: {
    name: { name: "Nome", type: "string", required: true, min: 3, max: 255 },
  }
}
