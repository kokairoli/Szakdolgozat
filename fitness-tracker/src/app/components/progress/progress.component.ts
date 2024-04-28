import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

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
  ],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  private readonly weightService = inject(WeightService);
  private readonly goalService = inject(GoalService);
  private readonly workoutService = inject(WorkoutService);

  weights: WeightDTO[] = [];
  currentWeight?: WeightDTO | null;
  clientGoal?: GoalDTO | null;

  currentMonthWorkouts: WorkoutDTO[] = [];
  allWorkouts: WorkoutDTO[] = [];
  finishedWorkouts: number = 0;
  plannedWorokuts: number = 0;

  addWeightVisible = false;
  isLoading = false;
  addWeightFormControl = new FormControl<number | undefined>(undefined, [
    Validators.required,
    Validators.min(30),
    Validators.max(635),
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
    });
  }

  getAllWeightForUser() {
    this.weightService.getWeightsForUser().subscribe((weights) => {
      this.weights = weights;
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
      this.currentMonthWorkouts = currentMonthWorkouts;
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
}
