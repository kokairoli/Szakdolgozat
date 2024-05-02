import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkoutDTO } from '../../model/WorkoutDTOs/CreateWorkoutDTO';
import { WorkoutDTO } from '../../model/WorkoutDTOs/WorkoutDTO';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { RemoveExerciseSetDTO } from '../../model/WorkoutDTOs/RemoveExerciseSetDTO';
import { EditWorkoutDTO } from 'src/app/model/WorkoutDTOs/EditWorkoutDTO';
import { WorkoutCoachDTO } from 'src/app/model/WorkoutDTOs/WorkoutCoachDTO';
import { CreateWorkoutCoachDTO } from 'src/app/model/WorkoutDTOs/CreateWorkoutCoachDTO';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  readonly workoutURL = '/workout';
  constructor(private http: HttpClient) {}

  createWorkout(createWorkoutDTO: CreateWorkoutDTO): Observable<WorkoutDTO> {
    return this.http.post<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + '/client',
      createWorkoutDTO
    );
  }

  createCoachWorkout(
    createWorkoutDTO: CreateWorkoutCoachDTO
  ): Observable<WorkoutDTO> {
    return this.http.post<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + '/coach',
      createWorkoutDTO
    );
  }

  updateWorkout(editWorkoutDTO: EditWorkoutDTO): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + '/edit',
      editWorkoutDTO
    );
  }

  finishWorkout(workoutId: string): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `/finish/${workoutId}`,
      null
    );
  }

  cancelFinishedWorkout(workoutId: string): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `/cancel/${workoutId}`,
      null
    );
  }

  deleteWorkout(workoutId: string): Observable<WorkoutDTO> {
    return this.http.delete<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `/${workoutId}`
    );
  }

  getClientWorkouts(): Observable<WorkoutDTO[]> {
    return this.http.get<WorkoutDTO[]>(
      environment.backendUrl + this.workoutURL + '/client'
    );
  }

  getWorkoutsOfCoachGroupedByClients(): Observable<WorkoutCoachDTO[]> {
    return this.http.get<WorkoutCoachDTO[]>(
      environment.backendUrl + this.workoutURL + '/coach'
    );
  }

  getWorkoutForClientCurrentMonth(): Observable<WorkoutDTO[]> {
    return this.http.get<WorkoutDTO[]>(
      environment.backendUrl + this.workoutURL + '/client/currentMonth'
    );
  }

  getWorkoutClient(workoutId: string): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `/client/${workoutId}`
    );
  }
}
