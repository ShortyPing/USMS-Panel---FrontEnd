import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainingCreateComponent } from './dashboard-training-create.component';

describe('DashboardTrainingCreateComponent', () => {
  let component: DashboardTrainingCreateComponent;
  let fixture: ComponentFixture<DashboardTrainingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
