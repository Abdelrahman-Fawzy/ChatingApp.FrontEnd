import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { RegisterDTO } from 'src/app/shared/types/UserDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  protected credentialsForm!: FormGroup;
  protected profileForm!: FormGroup;
  protected currentStep: number = 1;
  protected validationErrors = signal<string[]>([]);

  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.credentialsForm = this.registerCredentailsForm();
    this.profileForm = this.registerProfileForm();
  }

  get MaxDateOfBirth(): string {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  get MinDateOfBirth(): string {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 100);
    return today.toISOString().split('T')[0];
  }

  private registerCredentailsForm(): FormGroup {
    const form = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.isPasswordMatch('password')],
      ],
    });

    form.get('password')?.valueChanges.subscribe(() => {
      form.get('confirmPassword')?.updateValueAndValidity();
    });

    return form;
  }

  private registerProfileForm(): FormGroup {
    const form = this.fb.group({
      gender: ['Male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    return form;
  }

  private isPasswordMatch(matchto: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control?.parent;
      if (!parent) return null;

      const controlToMatch = parent.get(matchto);
      return controlToMatch && controlToMatch.value !== control.value
        ? { passwordMismatch: true }
        : null;
    };
  }

  register() {
    const formValue: RegisterDTO = {
      ...this.credentialsForm.value,
      ...this.profileForm.value,
    };

    this.accountService.register(formValue).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
        this.cancel();
      },
      error: (error) => {
        console.log(error);
        this.validationErrors.set(error);
      },
      complete: () => console.log('completed'),
    });
  }

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
