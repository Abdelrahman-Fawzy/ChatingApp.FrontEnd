import { PagingParams } from './paginations';

export class LikesParams implements PagingParams {
  pageNumber: number = 1;
  pageSize: number = 10;
  memberID: string = '';
  predicate: string = 'liked';
}
