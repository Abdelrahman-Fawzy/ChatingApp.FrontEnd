import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginDTO, RegisterDTO, User } from 'src/app/shared/types/UserDTO';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://localhost:5001/api';

  public currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private likesService: LikesService,
  ) {}

  register(credentials: RegisterDTO) {
    return this.http.post(`${this.baseUrl}/Account/Register`, credentials).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user as User);
        }
      }),
    );
  }

  login(credentials: LoginDTO) {
    return this.http.post(`${this.baseUrl}/Account/Login`, credentials).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user as User);
        }
      }),
    );
  }

  setCurrentUser(user: User | null) {
    this.currentUser.set(user as User);
    localStorage.setItem('user', JSON.stringify(user));
    this.likesService.GetCurrentMemberLikesIDs();
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.likesService.clearLikeIDs();
  }
}
