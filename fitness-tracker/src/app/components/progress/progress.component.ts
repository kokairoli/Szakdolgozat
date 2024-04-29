import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import { WeightService } from 'src/app/services/WeightService/weight.service';
import { WeightDTO } from 'src/app/model/WeightDTOs/WeightDTO';
import { GoalService } from 'src/app/services/GoalService/goal.service';
import { GoalDTO } from 'src/app/model/GoalDTOs/GoalDTO';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import { forkJoin } from 'rxjs';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { EditWorkoutDTO } from 'src/app/model/WorkoutDTOs/EditWorkoutDTO';
import { EditGoalDTO } from 'src/app/model/GoalDTOs/EditGoalDTO';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    ReactiveFormsModule,
    NzProgressModule,
    NzIconModule,
    NzInputNumberModule,
  ],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  private readonly weightService = inject(WeightService);
  private readonly goalService = inject(GoalService);
  private readonly workoutService = inject(WorkoutService);

  @ViewChild('chartObj') chart?: ChartComponent;

  weights: WeightDTO[] = [];
  currentWeight?: WeightDTO | null;
  clientGoal?: GoalDTO | null;

  currentMonthWorkouts: WorkoutDTO[] = [];
  currentMonthFinishedWorkouts: number = 0;
  monthPercentage: number = 0;
  allWorkouts: WorkoutDTO[] = [];
  finishedWorkouts: number = 0;
  plannedWorokuts: number = 0;
  allPercentage: number = 0;
  biggestWeight: number = 0;
  startWeigth: number = 0;
  smallestWeight: number = 0;

  editWeightGoal = false;
  editWorkoutGoal = false;
  addWeightVisible = false;
  isLoading = false;
  addWeightFormControl = new FormControl<number | undefined>(undefined, [
    Validators.required,
    Validators.min(30),
    Validators.max(635),
  ]);

  weightGoalFormControl = new FormControl<number | undefined>(undefined, [
    Validators.min(30),
    Validators.max(635),
  ]);

  workoutGoalFormControl = new FormControl<number | undefined>(undefined, [
    Validators.min(1),
  ]);

  chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Weight Progress',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {},
    };
  }

  ngOnInit(): void {
    this.getAllWeightForUser();
    this.getWorkoutForUser();
    this.weightService.getCurrentWeight().subscribe((weight) => {
      this.currentWeight = weight;
    });
    this.goalService.getGoal().subscribe((goal) => {
      this.clientGoal = goal;
      this.workoutGoalFormControl.setValue(goal?.targetWorkoutCount);
      this.weightGoalFormControl.setValue(goal?.targetWeight);
    });
  }

  getAllWeightForUser() {
    this.weightService.getWeightsForUser().subscribe((weights) => {
      this.weights = weights;
      this.startWeigth = weights[0].weight;
      this.biggestWeight = Math.max(...weights.map((weight) => weight.weight));
      this.smallestWeight = Math.min(...weights.map((weight) => weight.weight));

      this.chartOptions.series = [
        { name: 'Weight', data: weights.map((weight) => weight.weight) },
      ];

      this.chartOptions.xaxis = {
        type: 'category',
        categories: weights.map((weight) =>
          new Date(weight.recordedAt).toLocaleDateString('en-US', {
            dateStyle: 'short',
          })
        ),
      };
      this.chart?.updateOptions({
        series: this.chartOptions.series,
        xaxis: this.chartOptions.xaxis,
      });
    });
  }

  getWorkoutForUser() {
    forkJoin([
      this.workoutService.getClientWorkouts(),
      this.workoutService.getWorkoutForClientCurrentMonth(),
    ]).subscribe(([workouts, currentMonthWorkouts]) => {
      this.allWorkouts = workouts;
      this.finishedWorkouts = workouts.filter(
        (workout) => workout.finished
      ).length;
      this.allPercentage = +(
        (this.finishedWorkouts / workouts.length) *
        100
      ).toFixed(0);
      this.currentMonthWorkouts = currentMonthWorkouts;
      this.currentMonthFinishedWorkouts = currentMonthWorkouts.filter(
        (workout) => workout.finished
      ).length;
      this.monthPercentage = +(
        (this.currentMonthFinishedWorkouts / currentMonthWorkouts.length) *
        100
      ).toFixed(0);
    });
  }

  handleCancel(): void {
    this.addWeightVisible = false;
  }

  handleNewWeight(): void {
    if (
      this.addWeightFormControl.value &&
      this.addWeightFormControl.valid &&
      !isNaN(this.addWeightFormControl.value)
    ) {
      this.isLoading = true;
      this.weightService
        .addWeight({ weight: this.addWeightFormControl.value })
        .subscribe({
          next: (weightDTO: WeightDTO) => {
            this.currentWeight = weightDTO;
            this.addWeightVisible = false;
            this.isLoading = false;
            this.getAllWeightForUser();
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }

  translateEditWorkoutDTO(): EditGoalDTO {
    return {
      targetWeight:
        this.weightGoalFormControl.value === null
          ? undefined
          : this.weightGoalFormControl.value,
      targetWorkoutCount:
        this.workoutGoalFormControl.value === null
          ? undefined
          : this.workoutGoalFormControl.value,
    };
  }

  saveGoalWeight() {
    if (this.weightGoalFormControl.valid) {
      this.saveGoal(
        this.clientGoal?.targetWeight !== undefined ||
          this.clientGoal?.targetWorkoutCount !== undefined,
        {
          targetWeight:
            this.weightGoalFormControl.value === null
              ? undefined
              : this.weightGoalFormControl.value,
        },
        'weight'
      );
    }
  }

  saveWorkoutGoal() {
    if (this.workoutGoalFormControl.valid) {
      this.saveGoal(
        this.clientGoal?.targetWeight !== undefined ||
          this.clientGoal?.targetWorkoutCount !== undefined,
        {
          targetWorkoutCount:
            this.workoutGoalFormControl.value === null
              ? undefined
              : this.workoutGoalFormControl.value,
        },
        'workout'
      );
    }
  }

  private saveGoal(
    exist: boolean,
    editGoalDTO: EditGoalDTO,
    type: 'weight' | 'workout'
  ) {
    if (exist) {
      this.goalService
        .editGoalForClient(editGoalDTO)
        .subscribe((goal: GoalDTO) => {
          this.clientGoal = goal;
          this.setEditModeToFalse(type);
        });
    } else {
      this.goalService
        .createGoalForClient(editGoalDTO)
        .subscribe((goal: GoalDTO) => {
          this.clientGoal = goal;
          this.setEditModeToFalse(type);
        });
    }
  }

  setEditModeToFalse(type: 'weight' | 'workout') {
    switch (type) {
      case 'weight': {
        this.editWeightGoal = false;
        break;
      }
      case 'workout': {
        this.editWorkoutGoal = false;
        break;
      }
    }
  }
}
