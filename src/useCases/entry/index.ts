import { entryDAO } from "@dataAccess/index";

import makeEntryList from "./makeEntryList";
import makeEntryCreate from "./makeEntryCreate";
import makeEntryUpdate from "./makeEntryUpdate";
import makeEntryRemove from "./makeEntryRemove";

const getEntryList = makeEntryList({
  entryDAO
})

const postEntryCreate = makeEntryCreate({
  entryDAO
})

const putEntryUpdate = makeEntryUpdate({
  entryDAO
})

const deleteEntryRemove = makeEntryRemove({
  entryDAO
})

export {
  getEntryList,
  postEntryCreate,
  putEntryUpdate,
  deleteEntryRemove
}
