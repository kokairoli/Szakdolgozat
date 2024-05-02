import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import { WorkoutOfCoachDTO } from 'src/app/model/WorkoutDTOs/WorkoutOfCoachDTO';

@Component({
  selector: 'app-view-workout',
  standalone: true,
  imports: [NzModalModule, NzButtonModule],
  templateUrl: './view-workout.component.html',
  styleUrl: './view-workout.component.scss',
})
export class ViewWorkoutComponent {
  @Input() workout?: WorkoutDTO | WorkoutOfCoachDTO;
  @Input() isVisible: boolean = false;

  @Output()
  closeModal = new EventEmitter<void>();

  handleCancel() {
    this.closeModal.emit();
  }
}
