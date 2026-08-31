import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-button',
  templateUrl: './star-button.component.html',
  styleUrls: ['./star-button.component.scss'],
})
export class StarButtonComponent {
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Output() clickEvent = new EventEmitter<Event>();

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
