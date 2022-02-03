import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainingEditComponent } from './dashboard-training-edit.component';

describe('DashboardTrainingEditComponent', () => {
  let component: DashboardTrainingEditComponent;
  let fixture: ComponentFixture<DashboardTrainingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrainingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
