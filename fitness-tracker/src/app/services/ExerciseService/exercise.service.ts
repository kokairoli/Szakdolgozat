import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { ExerciseDTO } from 'src/app/model/ExerciseDTOs/ExerciseDTO';
import { ExerciseEnumsDTO } from 'src/app/model/ExerciseDTOs/ExerciseEnumsDTO';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  readonly exerciseURL = '/exercise';
  constructor(private http: HttpClient) {}

  getAllExercises(): Observable<ExerciseDTO[]> {
    return this.http.get<ExerciseDTO[]>(
      environment.backendUrl + this.exerciseURL
    );
  }

  getExerciseEnums(): Observable<ExerciseEnumsDTO> {
    return this.http.get<ExerciseEnumsDTO>(
      environment.backendUrl + this.exerciseURL + '/enums'
    );
  }
}
