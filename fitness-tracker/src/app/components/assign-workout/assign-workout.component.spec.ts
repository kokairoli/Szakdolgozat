import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkoutComponent } from './assign-workout.component';
import { HttpClientModule } from '@angular/common/http';

describe('AssignWorkoutComponent', () => {
  let component: AssignWorkoutComponent;
  let fixture: ComponentFixture<AssignWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignWorkoutComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
