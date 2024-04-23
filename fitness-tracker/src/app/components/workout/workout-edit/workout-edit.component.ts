import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WorkoutService } from 'src/app/services/workout.service';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzButtonModule],
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss'],
})
export class WorkoutEditComponent {
  private workoutService = inject(WorkoutService);

  @Input() isVisible: boolean = false;
  @Input() title?: string;
  @Input() mode: 'create' | 'edit' = 'create';
  isLoading = false;

  @Output()
  dataChanged = new EventEmitter<WorkoutDTO>();
  @Output()
  closeModal = new EventEmitter<void>();

  handleSave(): void {
    this.isLoading = true;
    switch (this.mode) {
      case 'create': {
        this.workoutService
          .createWorkout({
            name: 'Name',
            comment: 'My comment',
            createWorkoutSetDTOList: [
              { numberOfReps: 12, numberOfSets: 4, exerciseId: 1 },
            ],
          })
          .subscribe({
            next: (workoutDTO: WorkoutDTO) => {
              this.isLoading = false;
              this.dataChanged.emit(workoutDTO);
              this.closeModal.emit();
            },
            error: () => {
              this.closeModal.emit();
            },
          });
        break;
      }
    }
  }

  handleCancel() {
    this.closeModal.emit();
  }
}
