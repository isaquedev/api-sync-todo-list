import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryCreateDependecies {
  entryDAO: EntryDAO
}

interface PostEntryCreateBody {
  name: string
}

export default ({ entryDAO }: MakeEntryCreateDependecies) => {
  return async function postEntryCreate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PostEntryCreateBody;

      const entry = await entryDAO.create({
        name,
        userId,
      })
      
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