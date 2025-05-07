import PaginationI from "./Pagination";

export interface GetAllResI<EntityT> {
  status: string;
  totalNumOfDocs: number;
  paginationStatus: PaginationI;
  data: {
    docs: EntityT[];
  };
}

export interface GetOneResI<EntityT> {
  status: string;
  data: {
    doc: EntityT;
  };
}
