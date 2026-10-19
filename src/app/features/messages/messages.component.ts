import { Component, OnInit, signal } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/shared/types/messages';
import { MessagesParams } from 'src/app/shared/types/messagesParams';
import { PaginatedResult } from 'src/app/shared/types/paginations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  protected container = 'Inbox';
  protected fetchedContainer = 'Inbox';
  protected pageNumber = 1;
  protected pageSize = 10;
  protected paginatedMessages = signal<PaginatedResult<Message> | null>(null);
  protected messagesParams = new MessagesParams();

  tabs = [
    { label: 'Inbox', value: 'Inbox' },
    { label: 'Outbox', value: 'Outbox' },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessagesByContainer(this.messagesParams).subscribe({
      next: (response) => {
        this.paginatedMessages.set(response);
        this.fetchedContainer = this.container;
      },
    });
  }

  setContainer(container: string) {
    this.container = container;
    this.messagesParams.pageNumber = 1;
    this.messagesParams.container = container;
    this.loadMessages();
  }

  get isInbox() {
    return this.fetchedContainer === 'Inbox';
  }

  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.messagesParams.pageSize = event.pageSize;
    this.messagesParams.pageNumber = event.pageNumber;
    this.loadMessages();
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  deleteMessage($event: PointerEvent, arg1: string) {
    // throw new Error('Method not implemented.');
  }
}
