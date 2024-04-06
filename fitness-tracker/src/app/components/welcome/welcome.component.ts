import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from 'src/app/services/user.service';
import { AuthResponseDTO } from 'src/app/model/UserDTOs/AuthResponseDTO';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registerFormGroup: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private readonly router: Router
  ) {}

  register() {
    localStorage.removeItem('access_token');
    this.userService
      .registerUser({
        firstName: 'Roland',
        lastName: 'Kókai',
        email: 'asdasd@gmail.com',
        password: '1234',
      })
      .subscribe((response: AuthResponseDTO) => {
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/home']);
      });
  }

  login() {
    localStorage.removeItem('access_token');
    if (this.loginFormGroup.valid) {
      this.userService
        .loginUser({
          email: this.loginFormGroup.get('email')?.value,
          password: this.loginFormGroup.get('password')?.value,
        })
        .subscribe((response: AuthResponseDTO) => {
          localStorage.setItem('access_token', response.token);
          this.router.navigate(['/home']);
        });
    }
  }
}
