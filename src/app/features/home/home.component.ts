import { Component, signal } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  registerMode = signal<boolean>(false);

  constructor(protected accountService: AccountService) {}

  toggleRegister() {
    this.registerMode.set(!this.registerMode());
  }

  cancel(event: boolean) {
    this.registerMode.set(event);
  }
}
