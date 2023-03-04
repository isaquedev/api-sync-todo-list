import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryUpdateDependecies {
  entryDAO: EntryDAO
}

interface PutEntryUpdateParams {
  id: string
}

interface PutEntryUpdateBody {
  name: string
}

export default ({ entryDAO }: MakeEntryUpdateDependecies) => {
  return async function putEntryUpdate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PutEntryUpdateBody;
      const { id: entryId } = httpRequest.params as PutEntryUpdateParams;

      const entry = await entryDAO.findOneOfUser(entryId, userId);

      if (!entry) {
        return {
          statusCode: 404,
          body: {
            message: "Entry not found"
          }
        }
      }

      const updatedEntry = await entryDAO.update(entryId,
        { 
          name
        }
      )
      
      return {
        statusCode: 200,
        body: {
          data: updatedEntry
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