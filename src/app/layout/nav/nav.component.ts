import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { LoginDTO } from 'src/app/shared/types/UserDTO';
import { themes } from '../themes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  protected credentials: LoginDTO;
  protected selectedTheme = signal<string>(
    localStorage.getItem('theme') || 'light',
  );
  protected themes = themes;

  constructor(
    protected accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.credentials = this.createDefaultCredentials();
  }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  login() {
    this.accountService.login(this.credentials).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
        this.credentials = this.createDefaultCredentials();
      },
      error: (err) => this.toastr.error(err.error.message),
      complete: () => this.toastr.success('تم تسجيل الدخول بنجاح'),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/home');
  }

  private createDefaultCredentials(): LoginDTO {
    return {
      email: '',
      password: '',
    };
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
