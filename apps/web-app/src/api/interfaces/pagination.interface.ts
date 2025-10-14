export interface Pagination<T> {
  data: T[];
  pagination: {
    page: number;
    limitPerPage: number;
    totalCount: number;
    totalPages: number;
  };
}
