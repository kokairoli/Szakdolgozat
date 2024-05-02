import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthGuard } from './authguard/authentication-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { ClientAuthGuard } from './authguard/client-guard.service';
import { ClientsComponent } from './components/clients/clients.component';
import { CoachAuthGuard } from './authguard/coach-guard.service';
import { AssignWorkoutComponent } from './components/assign-workout/assign-workout.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'progress',
        component: ProgressComponent,
        canActivate: [ClientAuthGuard],
      },
      { path: 'exercises', component: ExerciseComponent },
      {
        path: 'workout',
        component: WorkoutComponent,
        canActivate: [ClientAuthGuard],
      },
      {
        path: 'coaches',
        component: CoachesComponent,
        canActivate: [ClientAuthGuard],
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [CoachAuthGuard],
      },
      {
        path: 'assign-workout',
        component: AssignWorkoutComponent,
        canActivate: [CoachAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
