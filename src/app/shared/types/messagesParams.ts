import { PagingParams } from './paginations';

export class MessagesParams implements PagingParams {
  pageNumber: number = 1;
  pageSize: number = 10;
  memberID: string = '';
  container: string = 'Inbox';
}
