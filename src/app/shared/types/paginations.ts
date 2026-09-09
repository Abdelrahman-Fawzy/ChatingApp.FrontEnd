export interface PaginatedResult<T> {
  metadata: Metadata;
  items: T[];
}

export interface Metadata {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export interface PagingParams {
  pageNumber: number;
  pageSize: number;
}

export class MemberParams implements PagingParams {
  gender?: string;
  pageNumber: number = 1;
  pageSize: number = 10;
  minAge: number = 18;
  maxAge: number = 100;
  orderBy: string = 'lastActive';
}
