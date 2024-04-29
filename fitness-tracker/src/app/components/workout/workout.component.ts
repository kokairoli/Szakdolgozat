import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WorkoutDTO } from 'src/app/model/WorkoutDTOs/WorkoutDTO';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
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

  workoutsData: WorkoutDTO[] = [];
  selectedWorkout: WorkoutDTO | undefined = undefined;

  tableView = false;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<span>Edit </span>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<span>Delete</span><br/>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.deleteWorkout(event.meta.id);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

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
        actions: this.actions,
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
    this.editWorkout(event.meta as WorkoutDTO);
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
