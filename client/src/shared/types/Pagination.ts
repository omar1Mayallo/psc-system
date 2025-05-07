export default interface PaginationI {
  currentPage: number;
  numOfItemsPerPage: number;
  numOfPages: number;
  nextPage?: number;
  previousPage?: number;
}
