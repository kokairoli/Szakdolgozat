import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { RegisterUserDTO } from '../model/UserDTOs/RegisterUserDTO';
import { LoginUserDTO } from '../model/UserDTOs/LoginUserDTO';
import { Observable } from 'rxjs';
import { AuthResponseDTO } from '../model/UserDTOs/AuthResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly authURL = '/auth';
  constructor(private http: HttpClient) {}

  registerUser(registerUserDTO: RegisterUserDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(
      environment.backendUrl + this.authURL + '/register',
      registerUserDTO
    );
  }

  loginUser(loginUserDTO: LoginUserDTO) {
    return this.http.post<AuthResponseDTO>(
      environment.backendUrl + this.authURL + '/login',
      loginUserDTO
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
