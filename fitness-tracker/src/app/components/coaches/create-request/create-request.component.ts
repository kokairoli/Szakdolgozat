import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CoachingRequestDTO } from 'src/app/model/CoachingRequestDTOs/CoachingRequestDTO';
import { CoachDTO } from 'src/app/model/UserDTOs/CoachDTO';
import { CoachesWithRequests } from '../coaches.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CoachingRequestService } from 'src/app/services/CoachRequestService/coaching-request.service';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
  ],
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent {
  private readonly coachRequestService = inject(CoachingRequestService);

  @Input() isVisible: boolean = false;
  @Input() title?: string;
  @Input() mode: 'create' | 'edit' = 'create';
  isLoading = false;
  @Input() coach?: CoachesWithRequests;

  @Output()
  dataChanged = new EventEmitter<void>();
  @Output()
  closeModal = new EventEmitter<void>();

  message = '';

  handleSave(): void {
    if (this.coach?.id) {
      this.isLoading = true;
      switch (this.mode) {
        case 'create': {
          this.coachRequestService
            .createRequest({ coachId: this.coach.id, message: this.message })
            .subscribe((data: CoachingRequestDTO) => {
              this.dataChanged.emit();
              this.isLoading = false;
              this.closeModal.emit();
            });
          break;
        }
        case 'edit': {
          break;
        }
      }
    }
  }

  handleCancel() {
    this.closeModal.emit();
  }
}
