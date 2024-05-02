import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { RegisterUserDTO } from '../../model/UserDTOs/RegisterUserDTO';
import { LoginUserDTO } from '../../model/UserDTOs/LoginUserDTO';
import { Observable } from 'rxjs';
import { AuthResponseDTO } from '../../model/UserDTOs/AuthResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly authURL = '/auth';
  constructor(private http: HttpClient) {}

  registerClient(
    registerUserDTO: RegisterUserDTO
  ): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(
      environment.backendUrl + this.authURL + '/client/register',
      registerUserDTO
    );
  }

  registerCoach(registerUserDTO: RegisterUserDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(
      environment.backendUrl + this.authURL + '/coach/register',
      registerUserDTO
    );
  }

  loginClient(loginUserDTO: LoginUserDTO) {
    return this.http.post<AuthResponseDTO>(
      environment.backendUrl + this.authURL + '/client/login',
      loginUserDTO
    );
  }

  loginCoach(loginUserDTO: LoginUserDTO) {
    return this.http.post<AuthResponseDTO>(
      environment.backendUrl + this.authURL + '/coach/login',
      loginUserDTO
    );
  }
}
