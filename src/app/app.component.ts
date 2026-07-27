import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users: any;

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    return this.http.get<any>(`https://localhost:5001/api/Users`).subscribe({
      next: (response) => (this.users = response),
      error: (err) => console.log(err),
      complete: () => console.log('Done'),
    });
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
