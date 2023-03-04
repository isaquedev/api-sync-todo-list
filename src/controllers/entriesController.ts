import { deleteEntryRemove, getEntryList, postEntryCreate, putEntryUpdate } from "@useCases/entry";
import { HttpRequest } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: (request: HttpRequest) => getEntryList(request),
  create: (request: HttpRequest) => postEntryCreate(request),
  update: (request: HttpRequest) => putEntryUpdate(request),
  remove: (request: HttpRequest) => deleteEntryRemove(request),
})
