import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { RegisterDTO } from 'src/app/shared/types/UserDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  protected credentials: RegisterDTO;
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {
    this.credentials = this.createDefaultCredentials();
  }

  register() {
    this.accountService.register(this.credentials).subscribe({
      next: (response) => {
        this.credentials = this.createDefaultCredentials();
        this.cancel();
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed'),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private createDefaultCredentials(): RegisterDTO {
    return {
      displayName: '',
      email: '',
      password: '',
    };
  }
}
