import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import { WorkoutService } from 'src/app/services/workout.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, WorkoutEditComponent],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);

  createNewWorkoutVisible = false;
  editExerciseVisible = false;

  workoutsData: WorkoutDTO[] = [];

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService.getClientWorkouts().subscribe((workouts) => {
      this.workoutsData = workouts;
    });
  }

  addNewWorkout(workout: WorkoutDTO) {
    this.closeCreateNewWorkout();
    this.workoutsData.push(workout);
    this.workoutsData = [...this.workoutsData];
  }

  closeCreateNewWorkout() {
    this.createNewWorkoutVisible = false;
  }

  deleteWorkout(workoutId: number) {
    this.workoutService.deleteWorkout(workoutId.toString()).subscribe(() => {
      this.getWorkouts();
    });
  }

  showCreateNewWorkout() {
    this.createNewWorkoutVisible = true;
  }
}
