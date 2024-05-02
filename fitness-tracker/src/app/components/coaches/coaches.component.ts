import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CoachService } from 'src/app/services/CoachService/coach.service';
import { NameSearchComponent } from '../name-search/name-search.component';
import { CoachDTO } from 'src/app/model/UserDTOs/CoachDTO';
import { CoachingRequestService } from 'src/app/services/CoachRequestService/coaching-request.service';
import { forkJoin } from 'rxjs';
import { CoachingRequestDTO } from 'src/app/model/CoachingRequestDTOs/CoachingRequestDTO';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateRequestComponent } from './create-request/create-request.component';
import { UserDTO } from 'src/app/model/UserDTOs/UserDTO';

export interface CoachesWithRequests {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  numberOfClients: number;
  coachRequest?: CoachingRequestDTO;
}

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NameSearchComponent,
    NzButtonModule,
    CreateRequestComponent,
  ],
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit {
  private readonly coachService = inject(CoachService);
  private readonly coachingRequestService = inject(CoachingRequestService);
  coaches: CoachesWithRequests[] = [];
  filteredCoaches: CoachesWithRequests[] = [];
  coachingRequests: CoachingRequestDTO[] = [];
  selectedCoach?: CoachesWithRequests;
  coachOfClient?: UserDTO;
  isVisible = false;

  mode: 'create' | 'edit' = 'create';

  filterName = '';

  ngOnInit(): void {
    this.getCoachesAndFilter();
  }

  getCoachesAndFilter() {
    forkJoin([
      this.coachService.listCoaches(),
      this.coachingRequestService.getRequestsOfClient(),
      this.coachService.getCoachOfClient(),
    ]).subscribe(([coaches, requests, coachOfClient]) => {
      this.coaches = coaches.map((coach) => {
        return {
          ...coach,
          coachRequest: requests.find(
            (request) => request.userDTO.id === coach.id
          ),
        };
      });

      this.filteredCoaches = [...this.coaches];
      this.coachingRequests = requests;
      this.coachOfClient = coachOfClient;
      this.filterCoaches(this.filterName);
      console.log(this.filteredCoaches);
    });
  }

  filterCoaches(name: string): void {
    this.filterName = name;
    if (this.filterName) {
      this.filteredCoaches = this.coaches.filter((coach) =>
        (coach.firstName + ' ' + coach.lastName)
          .toLowerCase()
          .includes(name.toLowerCase())
      );
    } else {
      this.filteredCoaches = [...this.coaches];
    }
  }

  openCreateRequestWindow(coach: CoachesWithRequests): void {
    this.mode = 'create';
    this.selectedCoach = coach;
    this.isVisible = true;
  }

  deleteRequest(coachingRequestId: number): void {
    this.coachingRequestService
      .deleteCoachingRequest(coachingRequestId)
      .subscribe(() => {
        this.getCoachesAndFilter();
      });
  }

  handleSave(): void {
    this.isVisible = false;
    this.getCoachesAndFilter();
    this.selectedCoach = undefined;
  }
}
