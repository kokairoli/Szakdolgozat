import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { CoachingRequestDTO } from 'src/app/model/CoachingRequestDTOs/CoachingRequestDTO';
import { CreateCoachingRequestDTO } from 'src/app/model/CoachingRequestDTOs/CreateCoachingRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class CoachingRequestService {
  readonly coachingRequestUrl = '/coachingRequest';
  constructor(private http: HttpClient) {}

  getRequestsOfClient(): Observable<CoachingRequestDTO[]> {
    return this.http.get<CoachingRequestDTO[]>(
      environment.backendUrl + this.coachingRequestUrl + '/client'
    );
  }

  getRequestsOfCoach(): Observable<CoachingRequestDTO[]> {
    return this.http.get<CoachingRequestDTO[]>(
      environment.backendUrl + this.coachingRequestUrl + '/coach'
    );
  }

  createRequest(
    loginUserDTO: CreateCoachingRequestDTO
  ): Observable<CoachingRequestDTO> {
    return this.http.post<CoachingRequestDTO>(
      environment.backendUrl + this.coachingRequestUrl + '/client',
      loginUserDTO
    );
  }

  deleteCoachingRequest(coachRequestId: number): Observable<void> {
    return this.http.delete<void>(
      environment.backendUrl +
        this.coachingRequestUrl +
        '/client/' +
        coachRequestId
    );
  }

  acceptCoachingRequest(coachRequestId: number): Observable<void> {
    return this.http.patch<void>(
      environment.backendUrl + this.coachingRequestUrl + '/coach/accept',
      coachRequestId
    );
  }
  refuseCoachingRequest(coachRequestId: number): Observable<void> {
    return this.http.patch<void>(
      environment.backendUrl + this.coachingRequestUrl + '/coach/refuse',
      coachRequestId
    );
  }
}
