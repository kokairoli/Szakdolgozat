import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WorkoutEditComponent } from '../workout-edit/workout-edit.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarModule,
  CalendarView,
} from 'angular-calendar';
import { ViewWorkoutComponent } from '../view-workout/view-workout.component';
import { CustomCalendarDateService } from 'src/app/services/CustomDateCalendar/custom-calendar-date.service';
import { Subject } from 'rxjs';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays,
} from 'date-fns';
import { EventColor } from 'calendar-utils';
import { WorkoutCoachDTO } from 'src/app/model/WorkoutDTOs/WorkoutCoachDTO';
import { WorkoutOfCoachDTO } from 'src/app/model/WorkoutDTOs/WorkoutOfCoachDTO';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  grey: {
    primary: '#bdbdbd',
    secondary: '#bdbdbd',
  },
  green: {
    primary: '#2bf05c',
    secondary: '#bdf2cd',
  },
};

@Component({
  selector: 'app-assign-workout',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    WorkoutEditComponent,
    NzIconModule,
    NzCheckboxModule,
    CalendarModule,
    ViewWorkoutComponent,
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomCalendarDateService,
    },
  ],
  templateUrl: './assign-workout.component.html',
  styleUrl: './assign-workout.component.scss',
})
export class AssignWorkoutComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);
  private readonly modalService = inject(NzModalService);

  createNewWorkoutVisible = false;
  editExerciseVisible = false;
  showWorkoutVisible = false;

  workoutsData: WorkoutCoachDTO[] = [];
  selectedWorkout: WorkoutOfCoachDTO | undefined = undefined;

  tableView = true;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<span>Delete</span><br/>',
      a11yLabel: 'Delete',
      onClick: ({
        event,
      }: {
        event: CalendarEvent<WorkoutOfCoachDTO>;
      }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        if (event.meta && !event.meta.finished) {
          this.deleteWorkout(event.meta.id);
        }
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent<WorkoutOfCoachDTO>[] = [];

  activeDayIsOpen: boolean = true;

  present = new Date();

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService
      .getWorkoutsOfCoachGroupedByClients()
      .subscribe((workouts: WorkoutCoachDTO[]) => {
        this.workoutsData = workouts.map((workoutGroup) => {
          workoutGroup.workouts = workoutGroup.workouts.map(
            (workout: WorkoutOfCoachDTO) => {
              workout.scheduled = new Date(workout.scheduled).toLocaleString(
                undefined,
                { dateStyle: 'short', timeStyle: 'short' }
              );
              return workout;
            }
          );
          return workoutGroup;
        });
        this.events = this.translateWorkoutsToCalendarEvents(this.workoutsData);
      });
  }

  translateWorkoutsToCalendarEvents(
    workouts: WorkoutCoachDTO[]
  ): CalendarEvent<WorkoutOfCoachDTO>[] {
    let returnEvents: CalendarEvent<WorkoutOfCoachDTO>[] = [];
    workouts.forEach((workoutGroup) => {
      returnEvents = returnEvents.concat(
        workoutGroup.workouts.map((workout) => {
          return {
            start: new Date(workout.scheduled),
            end: addHours(new Date(workout.scheduled), 2),
            title:
              workoutGroup.client.firstName +
              ' ' +
              workoutGroup.client.lastName +
              '<br>' +
              workout.name,
            color: { ...colors[this.workoutColorByDate(workout)] },
            actions: [
              {
                label: !workout.finished ? '<span>Edit </span>' : '',
                a11yLabel: 'Edit',
                onClick: ({
                  event,
                }: {
                  event: CalendarEvent<WorkoutOfCoachDTO>;
                }): void => {
                  if (event.meta) {
                    this.editWorkout(event.meta);
                  }
                },
              },
              ...this.actions,
            ],
            draggable: false,
            meta: workout,
          };
        })
      );
    });

    return returnEvents;
  }

  dataChanged(workout: WorkoutDTO) {
    this.closeWorkoutEdit();
    this.getWorkouts();
  }

  closeWorkoutEdit() {
    this.createNewWorkoutVisible = false;
    this.selectedWorkout = undefined;
  }

  showWorkout(workout: WorkoutOfCoachDTO) {
    this.selectedWorkout = workout;
    this.showWorkoutVisible = true;
  }

  hideWorkout() {
    this.selectedWorkout = undefined;
    this.showWorkoutVisible = false;
  }

  deleteWorkout(workoutId: number) {
    this.modalService.confirm({
      nzTitle: 'Are you sure?',
      nzContent:
        '<b style="color: red;">This action will delete this workout</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.workoutService
          .deleteWorkout(workoutId.toString())
          .subscribe(() => {
            this.getWorkouts();
          }),
      nzCancelText: 'No',
    });
  }

  editWorkout(selectedWorkout: WorkoutOfCoachDTO) {
    this.selectedWorkout = selectedWorkout;
    this.showWorkoutEdit();
  }

  workoutColorByDate(workout: WorkoutOfCoachDTO): 'red' | 'green' | 'grey' {
    const workoutDate = new Date(workout.scheduled);
    workoutDate.setHours(workoutDate.getHours() + 2);
    if (workout.finished) {
      return 'green';
    }
    if (workoutDate < this.present && !workout.finished) {
      return 'red';
    } else {
      return 'grey';
    }
  }

  showWorkoutEdit() {
    this.createNewWorkoutVisible = true;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.showWorkout(event.meta);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
