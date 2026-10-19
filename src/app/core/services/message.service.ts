import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/shared/types/messages';
import { MessagesParams } from 'src/app/shared/types/messagesParams';
import { PaginatedResult } from 'src/app/shared/types/paginations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessagesByContainer(messageParams: MessagesParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', messageParams.pageNumber);
    params = params.append('pageSize', messageParams.pageSize);
    params = params.append('container', messageParams.container);

    return this.http.get<PaginatedResult<Message>>(`${this.baseUrl}/messages`, {
      params,
    });
  }

  getMessageThread(otherMemberId: string) {
    return this.http.get<Message[]>(
      `${this.baseUrl}/messages/thread/${otherMemberId}`,
    );
  }

  createMessage(otherMemberId: string, content: string) {
    return this.http.post<Message>(`${this.baseUrl}/messages`, {
      recipientId: otherMemberId,
      content,
    });
  }

  deleteMessage(messageId: number) {
    return this.http.delete(`${this.baseUrl}/messages/${messageId}`);
  }
}
