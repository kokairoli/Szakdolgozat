import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-name-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
  ],
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.scss'],
})
export class NameSearchComponent {
  @Output()
  nameSearched = new EventEmitter<string>();

  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  onSearch(): void {
    this.nameSearched.emit(this.searchForm.value.name ?? '');
  }
}
