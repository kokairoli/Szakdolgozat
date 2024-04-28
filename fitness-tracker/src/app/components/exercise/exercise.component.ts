import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ExerciseDTO } from 'src/app/model/ExerciseDTOs/ExerciseDTO';
import { ExerciseService } from 'src/app/services/ExerciseService/exercise.service';
import { ExerciseEnumsDTO } from 'src/app/model/ExerciseDTOs/ExerciseEnumsDTO';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { columnItem } from 'src/app/interfaces/columnItem';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzSelectModule,
  ],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  private readonly exerciseService = inject(ExerciseService);

  searchForm = new FormGroup({
    name: new FormControl(''),
    mechanics: new FormControl<string[]>([]),
    muscleGroup: new FormControl<string[]>([]),
    difficulty: new FormControl<string[]>([]),
    equipment: new FormControl<string[]>([]),
  });

  displayedColumns: columnItem<ExerciseDTO>[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: ExerciseDTO, b: ExerciseDTO) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Mechanic',
      sortOrder: null,
      sortFn: (a: ExerciseDTO, b: ExerciseDTO) =>
        a.mechanics.localeCompare(b.mechanics),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Target muscle group',
      sortOrder: null,
      sortFn: (a: ExerciseDTO, b: ExerciseDTO) =>
        a.targetMuscleGroup.localeCompare(b.targetMuscleGroup),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Difficulty',
      sortOrder: null,
      sortFn: (a: ExerciseDTO, b: ExerciseDTO) =>
        a.difficulty.localeCompare(b.difficulty),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Equipment',
      sortOrder: null,
      sortFn: (a: ExerciseDTO, b: ExerciseDTO) =>
        a.equipment ? a.equipment?.localeCompare(b.equipment ?? '') : 0,
      sortDirections: ['ascend', 'descend', null],
    },
  ];

  filterDropDowns?: ExerciseEnumsDTO;

  exerciseData: ExerciseDTO[] = [];
  filteredExerciseData: ExerciseDTO[] = [];

  ngOnInit(): void {
    this.getExerciseData();
    this.getExerciseEnums();
  }

  getExerciseData() {
    this.exerciseService.getAllExercises().subscribe((data: ExerciseDTO[]) => {
      this.exerciseData = data;
      this.filteredExerciseData = [...data];
    });
  }

  getExerciseEnums() {
    this.exerciseService
      .getExerciseEnums()
      .subscribe((enums: ExerciseEnumsDTO) => {
        this.filterDropDowns = enums;
      });
  }

  onSearch() {
    const formValues = this.searchForm.value;
    this.filteredExerciseData = this.exerciseData.filter(
      (exercise) =>
        exercise.name
          .toLowerCase()
          .includes(formValues.name?.toLowerCase() ?? '') &&
        (formValues.difficulty && formValues.difficulty.length > 0
          ? formValues.difficulty?.includes(exercise.difficulty)
          : true) &&
        (formValues.mechanics && formValues.mechanics.length > 0
          ? formValues.mechanics?.includes(exercise.mechanics)
          : true) &&
        (formValues.muscleGroup && formValues.muscleGroup.length > 0
          ? formValues.muscleGroup?.includes(exercise.targetMuscleGroup)
          : true) &&
        (formValues.equipment && formValues.equipment.length > 0
          ? formValues.equipment?.includes(exercise.equipment ?? '')
          : true)
    );
  }
}
