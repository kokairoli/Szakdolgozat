import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkoutDTO } from '../model/WorkoutDTOs/CreateWorkoutDTO';
import { WorkoutDTO } from '../model/WorkoutDTOs/WorkoutDTO';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { RemoveExerciseSetDTO } from '../model/WorkoutDTOs/RemoveExerciseSetDTO';

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

  addExerciseToWorkout(
    createWorkoutDTO: CreateWorkoutDTO
  ): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + 'set/add',
      createWorkoutDTO
    );
  }

  removeExerciseFromWorkout(
    removeExerciseSetDTO: RemoveExerciseSetDTO
  ): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + 'set/remove',
      removeExerciseSetDTO
    );
  }

  finishWorkout(workoutId: string): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `finish/${workoutId}`,
      null
    );
  }

  cancelFinishedWorkout(workoutId: string): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `cancel/${workoutId}`,
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

  getWorkoutClient(workoutId: string): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(
      environment.backendUrl + this.workoutURL + `/client/${workoutId}`
    );
  }
}
