import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: '', component: ContainerComponent, canActivate: [], children: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
