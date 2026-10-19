import {
  Component,
  effect,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MemberService } from 'src/app/core/services/member.service';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/shared/types/messages';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
  protected messages = signal<Message[]>([]);
  protected messageContent = '';

  @ViewChild('messageEndRef') messageEndRef!: ElementRef;

  constructor(
    private messageService: MessageService,
    private memberService: MemberService,
  ) {
    effect(() => {
      const currentMessages = this.messages();
      if (currentMessages.length > 0) {
        this.scrollToBottom();
      }
    });
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    const memberId = this.memberService.member()?.id;
    if (memberId) {
      this.messageService.getMessageThread(memberId).subscribe({
        next: (messages) =>
          this.messages.set(
            messages.map((message) => ({
              ...message,
              currentUserSender: message.senderId !== memberId,
            })),
          ),
      });
    }
  }

  sendMessage() {
    const recipientId = this.memberService.member()?.id;
    if (!recipientId) return;
    this.messageService
      .createMessage(recipientId, this.messageContent)
      .subscribe({
        next: (message) => {
          this.messages.update((messages) => {
            message.currentUserSender = true;
            return [...messages, message];
          });
          this.messageContent = '';
        },
      });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messageEndRef) {
        this.messageEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }
}
