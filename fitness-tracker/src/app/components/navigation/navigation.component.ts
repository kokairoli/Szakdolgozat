import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { UserStorageService } from 'src/app/services/UserStorage/user-storage.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    NzButtonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  private readonly userStorageService = inject(UserStorageService);

  @Input()
  urlSegments: string[] = [];

  isClient = true;

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isClient = this.userStorageService.isClient();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userStorageService.clearLoggedInUser();
    this.router.navigate(['/welcome']);
  }
}
