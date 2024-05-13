import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestComponent } from './create-request.component';
import { HttpClientModule } from '@angular/common/http';

describe('CreateRequestComponent', () => {
  let component: CreateRequestComponent;
  let fixture: ComponentFixture<CreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequestComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
