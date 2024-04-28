import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    WorkoutEditComponent,
    NzIconModule,
    NzCheckboxModule,
    NzCalendarModule,
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);

  createNewWorkoutVisible = false;
  editExerciseVisible = false;

  workoutsData: WorkoutDTO[] = [];
  selectedWorkout: WorkoutDTO | undefined = undefined;

  tableView = true;

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService.getClientWorkouts().subscribe((workouts) => {
      this.workoutsData = workouts.map((workout) => {
        workout.scheduled = new Date(workout.scheduled).toLocaleString(
          undefined,
          { dateStyle: 'short', timeStyle: 'short' }
        );
        return workout;
      });
    });
  }

  dataChanged(workout: WorkoutDTO) {
    this.closeWorkoutEdit();
    this.getWorkouts();
  }

  closeWorkoutEdit() {
    this.createNewWorkoutVisible = false;
    this.selectedWorkout = undefined;
  }

  deleteWorkout(workoutId: number) {
    this.workoutService.deleteWorkout(workoutId.toString()).subscribe(() => {
      this.getWorkouts();
    });
  }

  editWorkout(selectedWorkout: WorkoutDTO) {
    this.selectedWorkout = selectedWorkout;
    this.showWorkoutEdit();
  }

  showWorkoutEdit() {
    this.createNewWorkoutVisible = true;
  }

  setFinished(workoutDTO: WorkoutDTO) {
    console.log('clicked');

    if (workoutDTO.finished) {
      this.workoutService
        .cancelFinishedWorkout(workoutDTO.id.toString())
        .subscribe((newWorkoutDTO: WorkoutDTO) => {
          this.getWorkouts();
        });
    } else {
      this.workoutService
        .finishWorkout(workoutDTO.id.toString())
        .subscribe((newWorkoutDTO: WorkoutDTO) => {
          this.getWorkouts();
        });
    }
  }
}
