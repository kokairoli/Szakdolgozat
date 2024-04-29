import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { EditGoalDTO } from 'src/app/model/GoalDTOs/EditGoalDTO';
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

  createGoalForClient(editGoalDTO: EditGoalDTO): Observable<GoalDTO> {
    return this.http.post<GoalDTO>(
      environment.backendUrl + this.goalURL,
      editGoalDTO
    );
  }

  editGoalForClient(editGoalDTO: EditGoalDTO): Observable<GoalDTO> {
    return this.http.patch<GoalDTO>(
      environment.backendUrl + this.goalURL,
      editGoalDTO
    );
  }
}
