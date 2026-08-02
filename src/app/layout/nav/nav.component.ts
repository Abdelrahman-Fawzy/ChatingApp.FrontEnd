import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { LoginDTO, User } from 'src/app/shared/types/UserDTO';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  protected credentials: LoginDTO;

  constructor(protected accountService: AccountService) {
    this.credentials = this.createDefaultCredentials();
  }

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.credentials).subscribe({
      next: (response) => {
        this.credentials = this.createDefaultCredentials();
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed'),
    });
  }

  logout() {
    this.accountService.logout();
  }

  private createDefaultCredentials(): LoginDTO {
    return {
      email: '',
      password: '',
    };
  }
}
