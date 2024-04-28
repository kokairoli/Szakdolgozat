import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeightComponent } from './edit-weight.component';

describe('EditWeightComponent', () => {
  let component: EditWeightComponent;
  let fixture: ComponentFixture<EditWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EditWeightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
