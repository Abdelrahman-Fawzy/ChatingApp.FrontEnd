import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  getUsers() {
    return this.http.get<any>(`https://localhost:5001/api/Members`).subscribe({
      next: (response) => {
        this.users = response;
        console.log(response);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Done'),
    });
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
