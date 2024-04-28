import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExerciseService } from 'src/app/services/ExerciseService/exercise.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { ExerciseDTO } from 'src/app/model/ExerciseDTOs/ExerciseDTO';
import { CreateWorkoutDTO } from 'src/app/model/WorkoutDTOs/CreateWorkoutDTO';
import { CreateExerciseSetDTO } from 'src/app/model/ExerciseSetDTOs/CreateExerciseSetDTO';
import { EditWorkoutDTO } from 'src/app/model/WorkoutDTOs/EditWorkoutDTO';

interface EditCreateExerciseSet {
  id: number;
  numberOfReps: number;
  numberOfSets: number;
  exerciseId: number;
}

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzIconModule,
    NzSelectModule,
  ],
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss'],
})
export class WorkoutEditComponent implements OnInit, OnChanges {
  private readonly workoutService = inject(WorkoutService);
  private readonly exerciseService = inject(ExerciseService);
  private readonly fb = inject(FormBuilder);

  @Input() isVisible: boolean = false;
  @Input() title?: string;
  isLoading = false;
  @Input() workout?: WorkoutDTO;

  @Output()
  dataChanged = new EventEmitter<WorkoutDTO>();
  @Output()
  closeModal = new EventEmitter<void>();

  exercises: ExerciseDTO[] = [];
  filterExercises: ExerciseDTO[] = [];

  workoutFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    scheduled: new FormControl<Date | undefined>(undefined, [
      Validators.required,
    ]),
    exerciseSet: this.fb.array<EditCreateExerciseSet>([]),
  });

  removedExerciseSets: number[] = [];

  size: NzSelectSizeType = 'default';

  ngOnInit(): void {
    this.getExercises();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.workout);

    if (changes['workout'] && this.workout) {
      this.loadWorkoutData();
    } else {
      this.workoutFormGroup.reset();
      this.exerciseSets.clear();
    }
  }

  loadWorkoutData(): void {
    this.workoutFormGroup.patchValue({
      name: this.workout?.name,
      comment: this.workout?.comment,
      scheduled: new Date(this.workout?.scheduled ?? ''),
    });

    this.workout?.sets.forEach((set) => {
      const newexerciseSet = this.fb.group({
        id: set.id,
        numberOfReps: set.numberOfReps,
        numberOfSets: set.numberOfSets,
        exerciseId: set.exercise.id,
      });
      this.exerciseSets.push(newexerciseSet);
    });
  }

  handleSave(): void {
    console.log(this.workoutFormGroup.value);
    if (this.workoutFormGroup.valid) {
      this.isLoading = true;
      if (this.workout) {
        this.workoutService
          .updateWorkout(this.translateEditWorkoutDTO())
          .subscribe({
            next: (workoutDTO: WorkoutDTO) => {
              this.isLoading = false;
              this.dataChanged.emit(workoutDTO);
              this.workoutFormGroup.reset();
              this.exerciseSets.clear();
              this.closeModal.emit();
            },
            error: () => {
              this.isLoading = false;
              this.workoutFormGroup.reset();
              this.exerciseSets.clear();
              this.closeModal.emit();
            },
          });
      } else {
        this.workoutService
          .createWorkout(this.translateCreateClientWorkoutDTO())
          .subscribe({
            next: (workoutDTO: WorkoutDTO) => {
              this.isLoading = false;
              this.dataChanged.emit(workoutDTO);
              this.workoutFormGroup.reset();
              this.exerciseSets.clear();
              this.closeModal.emit();
            },
            error: () => {
              this.isLoading = false;
              this.workoutFormGroup.reset();
              this.exerciseSets.clear();
              this.closeModal.emit();
            },
          });
      }
    }
  }

  handleEditClose() {
    this.dataChanged.emit();
    this.workoutFormGroup.reset();
    this.exerciseSets.clear();
    this.closeModal.emit();
  }

  translateEditWorkoutDTO(): EditWorkoutDTO {
    const controls = this.workoutFormGroup.controls;
    const editCreateExerciseSet: EditCreateExerciseSet[] = [];
    controls.exerciseSet.value.forEach((set) => {
      if (set !== null) {
        editCreateExerciseSet.push(set);
      }
    });
    return {
      id: this.workout?.id ?? -1,
      name: controls.name.value ?? '',
      comment: controls.comment.value ?? '',
      scheduled: controls.scheduled.value!.toISOString(),
      sets: editCreateExerciseSet,
      forDeleteSetIds: this.removedExerciseSets,
    };
  }

  translateCreateClientWorkoutDTO(): CreateWorkoutDTO {
    const controls = this.workoutFormGroup.controls;
    const editCreateExerciseSet: EditCreateExerciseSet[] = [];
    controls.exerciseSet.value.forEach((set) => {
      if (set !== null) {
        editCreateExerciseSet.push(set);
      }
    });
    return {
      name: controls.name.value ?? '',
      comment: controls.comment.value ?? '',
      scheduled: controls.scheduled.value!.toISOString(),
      createWorkoutSetDTOList: editCreateExerciseSet,
    };
  }

  getExercises() {
    this.exerciseService
      .getAllExercises()
      .subscribe((exercises: ExerciseDTO[]) => {
        this.exercises = exercises;
        this.filterExercises = exercises;
      });
  }

  get exerciseSets() {
    return this.workoutFormGroup.controls['exerciseSet'] as FormArray;
  }

  addExerciseSet() {
    const newexerciseSet = this.fb.group({
      id: -1,
      numberOfReps: new FormControl(null, [Validators.required]),
      numberOfSets: new FormControl(null, [Validators.required]),
      exerciseId: new FormControl(null, [Validators.required]),
    });
    this.exerciseSets.push(newexerciseSet);
  }

  deleteExerciseSet(index: number) {
    const workoutSetId = this.exerciseSets.at(index).value.id;

    if (workoutSetId && this.workout) {
      this.removedExerciseSets.push(workoutSetId);
      this.exerciseSets.removeAt(index);
    } else {
      this.exerciseSets.removeAt(index);
    }
  }

  handleCancel() {
    this.closeModal.emit();
  }
}
