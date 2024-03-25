import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  urlSegments: string[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.url)
      )
      .subscribe((url) =>
        url.subscribe((url) => {
          this.urlSegments = url.map((segment) => segment.path);
          if (this.urlSegments.length === 0) {
            this.router.navigate(['/home']);
          }
        })
      );
  }
}
