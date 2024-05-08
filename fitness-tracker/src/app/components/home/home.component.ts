import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/UserStorage/user-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly userStorage = inject(UserStorageService);

  isClient = false;

  ngOnInit(): void {
    this.isClient = this.userStorage.isClient();
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
