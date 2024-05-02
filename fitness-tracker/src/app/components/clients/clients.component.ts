import { Component, inject, OnInit } from '@angular/core';
import { NameSearchComponent } from '../name-search/name-search.component';
import { CoachingRequestService } from 'src/app/services/CoachRequestService/coaching-request.service';
import { CoachingRequestDTO } from 'src/app/model/CoachingRequestDTOs/CoachingRequestDTO';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CoachService } from 'src/app/services/CoachService/coach.service';
import { UserDTO } from 'src/app/model/UserDTOs/UserDTO';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [NameSearchComponent, NzCardModule, NzButtonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  private readonly coachRequestService = inject(CoachingRequestService);
  private readonly coachService = inject(CoachService);

  coachingRequests: CoachingRequestDTO[] = [];
  clients: UserDTO[] = [];

  ngOnInit(): void {
    this.getRequests();
    this.getClients();
  }

  getRequests() {
    this.coachRequestService
      .getRequestsOfCoach()
      .subscribe((requests: CoachingRequestDTO[]) => {
        this.coachingRequests = requests.filter(
          (request) => !request.accepted && request.active
        );
      });
  }

  getClients() {
    this.coachService.listClientsOfCoach().subscribe((clients: UserDTO[]) => {
      this.clients = clients;
      console.log(clients);
    });
  }

  acceptRequest(request: CoachingRequestDTO) {
    this.coachRequestService.acceptCoachingRequest(request.id).subscribe(() => {
      this.getRequests();
      this.getClients();
    });
  }

  refuseRequest(request: CoachingRequestDTO) {
    this.coachRequestService.refuseCoachingRequest(request.id).subscribe(() => {
      this.getRequests();
      this.getClients();
    });
  }

  deleteClient(client: UserDTO) {
    this.coachService.removeClient(client.id).subscribe(() => {
      this.getClients();
      this.getRequests();
    });
  }
}
