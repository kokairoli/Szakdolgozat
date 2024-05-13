import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesComponent } from './coaches.component';
import { HttpClientModule } from '@angular/common/http';

describe('CoachesComponent', () => {
  let component: CoachesComponent;
  let fixture: ComponentFixture<CoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachesComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
