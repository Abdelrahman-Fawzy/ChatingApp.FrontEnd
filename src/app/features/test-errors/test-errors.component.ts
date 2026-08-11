import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss'],
})
export class TestErrorsComponent {
  private baseUrl = 'https://localhost:5001/api/buggy';
  private AccountUrl = 'https://localhost:5001/api/account';
  private http = inject(HttpClient);

  validationErrors = signal<string[]>([]);

  get401Error() {
    return this.http.get(`${this.baseUrl}/auth`).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get404Error() {
    return this.http.get(`${this.baseUrl}/not-found`).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400Error() {
    return this.http.get(`${this.baseUrl}/bad-request`).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get500Error() {
    return this.http.get(`${this.baseUrl}/server-error`).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  getValidationError() {
    return this.http.post(`${this.AccountUrl}/register`, {}).subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.log(err);
        this.validationErrors.set(err);
      },
    });
  }
}
