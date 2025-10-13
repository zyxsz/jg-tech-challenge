export interface PaginationInput {
  page: number;
  limitPerPage: number;
}

export interface PaginationOutput<T> {
  data: T[];
  pagination: {
    page: number;
    limitPerPage: number;
    totalPages: number;
    totalCount: number;
  };
}
