import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/model/UserDTOs/UserDTO';
import { environment } from 'src/app/environment/environment';
import { CoachDTO } from 'src/app/model/UserDTOs/CoachDTO';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  readonly coachUrl = '/coach';
  constructor(private http: HttpClient) {}

  listCoaches(): Observable<CoachDTO[]> {
    return this.http.get<CoachDTO[]>(environment.backendUrl + this.coachUrl);
  }

  listClientsOfCoach(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(
      environment.backendUrl + this.coachUrl + '/clients'
    );
  }

  getCoachOfClient(): Observable<UserDTO> {
    return this.http.get<UserDTO>(
      environment.backendUrl + this.coachUrl + '/one'
    );
  }

  removeClient(clientId: number): Observable<void> {
    return this.http.patch<void>(
      environment.backendUrl + this.coachUrl + '/clients/remove',
      clientId
    );
  }

  removeCoach(coachId: number): Observable<void> {
    return this.http.patch<void>(
      environment.backendUrl + this.coachUrl + '/remove',
      coachId
    );
  }
}
