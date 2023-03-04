import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryRemoveDependecies {
  entryDAO: EntryDAO
}

interface DeleteEntryRemoveParams {
  id: string
}

export default ({ entryDAO }: MakeEntryRemoveDependecies) => {
  return async function deleteEntryRemove(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { id: entryId } = httpRequest.params as DeleteEntryRemoveParams;

      const entry = await entryDAO.findOneOfUser(entryId, userId);

      if (!entry) {
        return {
          statusCode: 404,
          body: {
            message: "Entry not found"
          }
        }
      }

      await entryDAO.remove(entryId)
      
      return {
        statusCode: 200,
        body: {
          data: entry
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