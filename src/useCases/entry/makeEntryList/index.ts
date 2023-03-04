import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryListDependecies {
  entryDAO: EntryDAO
}

interface MakeEntryListQuery {
  page: string
  perPage: string
  date: string
}

export default ({ entryDAO }: MakeEntryListDependecies) => {
  return async function getEntryList(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { page, perPage, date } = httpRequest.query as MakeEntryListQuery;

      const pagination = {
        page: Number(page),
        perPage: Number(perPage)
      }

      const entries = await entryDAO.findAllPaginated(userId, pagination, date);
      const entriesLenght = await entryDAO.count(userId);

      const nbPages = Math.ceil(entriesLenght / pagination.perPage);
      
      return {
        statusCode: 200,
        body: {
          data: entries,
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