import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
  @Input() disabled: boolean = false;
  @Output() clickEvent = new EventEmitter<Event>();

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
