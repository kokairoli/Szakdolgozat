import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoachMessageComponent } from './view-coach-message.component';

describe('ViewCoachMessageComponent', () => {
  let component: ViewCoachMessageComponent;
  let fixture: ComponentFixture<ViewCoachMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ViewCoachMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoachMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
