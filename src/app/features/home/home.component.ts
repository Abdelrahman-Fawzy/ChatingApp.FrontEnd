import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  registerMode = signal<boolean>(false);

  toggleRegister() {
    this.registerMode.set(!this.registerMode());
  }

  cancel(event: boolean) {
    this.registerMode.set(event);
  }
}
