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
import { EditWorkoutDTO } from 'src/app/model/WorkoutDTOs/EditWorkoutDTO';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CoachService } from 'src/app/services/CoachService/coach.service';
import { UserDTO } from 'src/app/model/UserDTOs/UserDTO';
import { WorkoutOfCoachDTO } from 'src/app/model/WorkoutDTOs/WorkoutOfCoachDTO';
import { CreateWorkoutCoachDTO } from 'src/app/model/WorkoutDTOs/CreateWorkoutCoachDTO';

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
    NzFormModule,
  ],
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss'],
})
export class WorkoutEditComponent implements OnInit, OnChanges {
  private readonly workoutService = inject(WorkoutService);
  private readonly exerciseService = inject(ExerciseService);
  private readonly coachService = inject(CoachService);
  private readonly fb = inject(FormBuilder);

  @Input() isVisible: boolean = false;
  @Input() title?: string;
  isLoading = false;
  @Input() workout?: WorkoutDTO | WorkoutOfCoachDTO;
  @Input() isCoach = false;

  @Output()
  dataChanged = new EventEmitter<WorkoutDTO>();
  @Output()
  closeModal = new EventEmitter<void>();

  exercises: ExerciseDTO[] = [];

  clientsOfCoach: UserDTO[] = [];

  workoutFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    scheduled: new FormControl<Date | undefined>(undefined, [
      Validators.required,
    ]),
    exerciseSet: this.fb.array<EditCreateExerciseSet>([]),
  });

  coachWorkoutFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    scheduled: new FormControl<Date | undefined>(undefined, [
      Validators.required,
    ]),
    clientId: new FormControl<number | null>(null, [Validators.required]),
    exerciseSet: this.fb.array<EditCreateExerciseSet>([]),
  });

  timeZoneOffset = new Date().getTimezoneOffset() * -1;

  removedExerciseSets: number[] = [];

  size: NzSelectSizeType = 'default';

  ngOnInit(): void {
    this.getExercises();
    if (this.isCoach) {
      this.getClients();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workout'] && this.workout) {
      this.loadWorkoutData();
    } else {
      this.workoutFormGroup.reset();
      this.coachWorkoutFormGroup.reset();
      this.exerciseSets.clear();
    }
  }

  getExercises() {
    this.exerciseService
      .getAllExercises()
      .subscribe((exercises: ExerciseDTO[]) => {
        this.exercises = exercises;
      });
  }

  getClients() {
    this.coachService.listClientsOfCoach().subscribe((clients: UserDTO[]) => {
      this.clientsOfCoach = clients;
    });
  }

  loadWorkoutData(): void {
    if (!this.isCoach) {
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
    } else {
      const workoutOfCoach = this.workout as WorkoutOfCoachDTO;
      this.coachWorkoutFormGroup.patchValue({
        name: workoutOfCoach?.name,
        comment: workoutOfCoach?.comment,
        scheduled: new Date(workoutOfCoach?.scheduled ?? ''),
        clientId: workoutOfCoach.clientId,
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
  }

  handleSave(): void {
    if (
      (this.isCoach && this.coachWorkoutFormGroup.valid) ||
      (!this.isCoach && this.workoutFormGroup.valid)
    ) {
      this.isLoading = true;
      if (this.workout) {
        this.workoutService
          .updateWorkout(this.translateEditWorkoutDTO())
          .subscribe({
            next: (workoutDTO: WorkoutDTO) => {
              this.dataChanged.emit(workoutDTO);
              this.close();
            },
            error: () => {
              this.close();
            },
          });
      } else {
        if (this.isCoach) {
          this.workoutService
            .createCoachWorkout(this.translateCreateCoachWorkoutDTO())
            .subscribe({
              next: () => {
                this.dataChanged.emit();
                this.close();
              },
              error: () => {
                this.close();
              },
            });
        } else {
          this.workoutService
            .createWorkout(this.translateCreateClientWorkoutDTO())
            .subscribe({
              next: (workoutDTO: WorkoutDTO) => {
                this.dataChanged.emit(workoutDTO);
                this.close();
              },
              error: () => {
                this.close();
              },
            });
        }
      }
    }
  }

  close() {
    this.isLoading = false;
    this.workoutFormGroup.reset();
    this.coachWorkoutFormGroup.reset();
    this.exerciseSets.clear();
    this.closeModal.emit();
  }

  handleEditClose() {
    this.dataChanged.emit();
    this.workoutFormGroup.reset();
    this.exerciseSets.clear();
    this.closeModal.emit();
  }

  handleTimeZoneDifference(date: Date) {
    return date.setHours(
      date.getHours() + this.timeZoneOffset / 60,
      date.getMinutes()
    );
  }

  translateEditWorkoutDTO(): EditWorkoutDTO {
    if (this.isCoach) {
      const controls = this.coachWorkoutFormGroup.controls;
      const scheduledDate = this.handleTimeZoneDifference(
        controls.scheduled.value!
      );
      const editCreateExerciseSet: EditCreateExerciseSet[] = [];
      controls.exerciseSet.value.forEach((set) => {
        if (set !== null) {
          editCreateExerciseSet.push(set);
        }
      });
      return {
        id: this.workout?.id ?? -1,
        clientId: controls.clientId.value ?? undefined,
        name: controls.name.value ?? '',
        comment: controls.comment.value ?? '',
        scheduled: controls.scheduled.value!.toISOString(),
        sets: editCreateExerciseSet,
        forDeleteSetIds: this.removedExerciseSets,
      };
    } else {
      const controls = this.workoutFormGroup.controls;
      const scheduledDate = this.handleTimeZoneDifference(
        controls.scheduled.value!
      );
      const editCreateExerciseSet: EditCreateExerciseSet[] = [];
      controls.exerciseSet.value.forEach((set) => {
        if (set !== null) {
          editCreateExerciseSet.push(set);
        }
      });
      return {
        id: this.workout?.id ?? -1,
        clientId: undefined,
        name: controls.name.value ?? '',
        comment: controls.comment.value ?? '',
        scheduled: controls.scheduled.value!.toISOString(),
        sets: editCreateExerciseSet,
        forDeleteSetIds: this.removedExerciseSets,
      };
    }
  }

  translateCreateClientWorkoutDTO(): CreateWorkoutDTO {
    const controls = this.workoutFormGroup.controls;
    const scheduledDate = this.handleTimeZoneDifference(
      controls.scheduled.value!
    );
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

  translateCreateCoachWorkoutDTO(): CreateWorkoutCoachDTO {
    const controls = this.coachWorkoutFormGroup.controls;
    const scheduledDate = this.handleTimeZoneDifference(
      controls.scheduled.value!
    );
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
      userId: controls.clientId.value ?? -1,
      createWorkoutSetDTOList: editCreateExerciseSet,
    };
  }

  get exerciseSets() {
    if (!this.isCoach) {
      return this.workoutFormGroup.controls['exerciseSet'] as FormArray;
    } else {
      return this.coachWorkoutFormGroup.controls['exerciseSet'] as FormArray;
    }
  }

  addExerciseSet() {
    const newexerciseSet = this.fb.group({
      id: -1,
      numberOfReps: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      numberOfSets: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
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
