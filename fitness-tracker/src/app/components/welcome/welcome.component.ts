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
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private readonly userStorageService = inject(UserStorageService);

  clientFormsShown = true;

  clientLoginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  clientRegisterFormGroup: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  coachLoginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  coachRegisterFormGroup: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

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
        this.saveUserAndNavigateToHome(response);
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
        .subscribe((response: AuthResponseDTO) => {
          this.saveUserAndNavigateToHome(response);
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
        this.saveUserAndNavigateToHome(response);
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
        .subscribe((response: AuthResponseDTO) => {
          this.saveUserAndNavigateToHome(response);
        });
    }
  }
}
