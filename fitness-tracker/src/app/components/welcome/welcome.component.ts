import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from 'src/app/services/UserService/user.service';
import { AuthResponseDTO } from 'src/app/model/UserDTOs/AuthResponseDTO';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/UserStorage/user-storage.service';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzButtonModule,
    InputErrorComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private readonly userStorageService = inject(UserStorageService);

  clientFormsShown = true;

  clientLoginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  clientRegisterFormGroup: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  coachLoginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  coachRegisterFormGroup: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  authErrors = {
    clientLogin: '',
    clientRegister: '',
    coachLogin: '',
    coachRegister: '',
  };

  constructor(
    private userService: UserService,
    private readonly router: Router
  ) {}

  registerClient() {
    localStorage.removeItem('access_token');
    this.userService
      .registerClient({
        firstName: this.clientRegisterFormGroup.get('firstName')?.value,
        lastName: this.clientRegisterFormGroup.get('lastName')?.value,
        email: this.clientRegisterFormGroup.get('email')?.value,
        password: this.clientRegisterFormGroup.get('password')?.value,
      })
      .subscribe((response: AuthResponseDTO) => {
        if (!response.errorMessage) {
          this.saveUserAndNavigateToHome(response);
        } else {
          this.authErrors.clientRegister = response.errorMessage;
        }
      });
  }

  loginClient() {
    localStorage.removeItem('access_token');
    if (this.clientLoginFormGroup.valid) {
      this.userService
        .loginClient({
          email: this.clientLoginFormGroup.get('email')?.value,
          password: this.clientLoginFormGroup.get('password')?.value,
        })
        .subscribe({
          next: (response: AuthResponseDTO) => {
            if (!response.errorMessage) {
              this.saveUserAndNavigateToHome(response);
            } else {
              this.authErrors.clientLogin = response.errorMessage;
            }
          },
          error: () => {
            this.authErrors.clientLogin = 'Invalid email or password';
          },
        });
    }
  }

  saveUserAndNavigateToHome(response: AuthResponseDTO) {
    localStorage.setItem('access_token', response.token);
    this.userStorageService.setLoggedInUser();
    this.router.navigate(['/home']);
  }

  registerCoach() {
    localStorage.removeItem('access_token');
    this.userService
      .registerCoach({
        firstName: this.coachRegisterFormGroup.get('firstName')?.value,
        lastName: this.coachRegisterFormGroup.get('lastName')?.value,
        email: this.coachRegisterFormGroup.get('email')?.value,
        password: this.coachRegisterFormGroup.get('password')?.value,
      })
      .subscribe((response: AuthResponseDTO) => {
        if (!response.errorMessage) {
          this.saveUserAndNavigateToHome(response);
        } else {
          this.authErrors.coachRegister = response.errorMessage;
        }
      });
  }

  loginCoach() {
    localStorage.removeItem('access_token');
    if (this.coachLoginFormGroup.valid) {
      this.userService
        .loginCoach({
          email: this.coachLoginFormGroup.get('email')?.value,
          password: this.coachLoginFormGroup.get('password')?.value,
        })
        .subscribe({
          next: (response: AuthResponseDTO) => {
            if (!response.errorMessage) {
              this.saveUserAndNavigateToHome(response);
            } else {
              this.authErrors.coachLogin = response.errorMessage;
            }
          },
          error: () => {
            this.authErrors.coachLogin = 'Invalid email or password';
          },
        });
    }
  }
}
