import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { GoalDTO } from 'src/app/model/GoalDTOs/GoalDTO';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  readonly goalURL = '/goal';
  constructor(private http: HttpClient) {}

  getGoal(): Observable<GoalDTO | null> {
    return this.http.get<GoalDTO | null>(environment.backendUrl + this.goalURL);
  }
}
