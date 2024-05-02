import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
import { EventColor } from 'calendar-utils';
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
import { Subject } from 'rxjs';
import { CustomCalendarDateService } from 'src/app/services/CustomDateCalendar/custom-calendar-date.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewWorkoutComponent } from '../view-workout/view-workout.component';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#2bf05c',
    secondary: '#bdf2cd',
  },
};

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
    CalendarModule,
    ViewWorkoutComponent,
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomCalendarDateService,
    },
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  private readonly workoutService = inject(WorkoutService);
  private readonly modalService = inject(NzModalService);

  createNewWorkoutVisible = false;
  editExerciseVisible = false;
  showWorkoutVisible = false;

  workoutsData: WorkoutDTO[] = [];
  selectedWorkout: WorkoutDTO | undefined = undefined;

  tableView = false;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService.getClientWorkouts().subscribe((workouts) => {
      this.events = this.translateWorkoutsToCalendarEvents(workouts);
      this.workoutsData = workouts.map((workout) => {
        workout.scheduled = new Date(workout.scheduled).toLocaleString(
          undefined,
          { dateStyle: 'short', timeStyle: 'short' }
        );
        return workout;
      });
    });
  }

  translateWorkoutsToCalendarEvents(
    workouts: WorkoutDTO[]
  ): CalendarEvent<WorkoutDTO>[] {
    return workouts.map((workout) => {
      return {
        start: new Date(workout.scheduled),
        end: addHours(new Date(workout.scheduled), 2),
        title: workout.name,
        color: workout.finished ? { ...colors['green'] } : { ...colors['red'] },
        actions: !workout.coach
          ? [
              {
                label: workout.finished
                  ? '<span>Cancel finished workout </span><br>'
                  : '<span>Finish </span><br>',
                a11yLabel: 'Finish',
                onClick: ({
                  event,
                }: {
                  event: CalendarEvent<WorkoutDTO>;
                }): void => {
                  const workout = event.meta as WorkoutDTO;
                  this.setFinished(workout);
                },
              },
              {
                label: !workout.finished ? '<span>Edit </span>' : '',
                a11yLabel: 'Edit',
                onClick: ({
                  event,
                }: {
                  event: CalendarEvent<WorkoutDTO>;
                }): void => {
                  if (event.meta && !event.meta.finished) {
                    this.editWorkout(event.meta);
                  }
                },
              },
              {
                label: '<span>Delete</span><br/>',
                a11yLabel: 'Delete',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                  this.deleteWorkout(event.meta.id);
                },
              },
            ]
          : [
              {
                label: workout.finished
                  ? '<span>Cancel finished workout </span><br>'
                  : '<span>Finish </span><br>',
                a11yLabel: 'Finish',
                onClick: ({
                  event,
                }: {
                  event: CalendarEvent<WorkoutDTO>;
                }): void => {
                  const workout = event.meta as WorkoutDTO;
                  this.setFinished(workout);
                },
              },
            ],
        draggable: false,
        meta: workout,
      };
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

  showWorkout(workout: WorkoutDTO) {
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

  editWorkout(selectedWorkout: WorkoutDTO) {
    this.selectedWorkout = selectedWorkout;
    this.showWorkoutEdit();
  }

  showWorkoutEdit() {
    this.createNewWorkoutVisible = true;
  }

  setFinished(workoutDTO: WorkoutDTO) {
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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.showWorkout(event.meta as WorkoutDTO);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
