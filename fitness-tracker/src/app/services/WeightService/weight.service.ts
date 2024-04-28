import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { AddWeightDTO } from 'src/app/model/WeightDTOs/AddWeightDTO';
import { WeightDTO } from 'src/app/model/WeightDTOs/WeightDTO';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  readonly weightURL = '/weight';
  constructor(private http: HttpClient) {}

  getWeightsForUser(): Observable<WeightDTO[]> {
    return this.http.get<WeightDTO[]>(environment.backendUrl + this.weightURL);
  }

  getCurrentWeight(): Observable<WeightDTO | null> {
    return this.http.get<WeightDTO | null>(
      environment.backendUrl + this.weightURL + '/latest'
    );
  }

  addWeight(addWeightDTO: AddWeightDTO): Observable<WeightDTO> {
    return this.http.post<WeightDTO>(
      environment.backendUrl + this.weightURL,
      addWeightDTO
    );
  }
}
