import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDutyComponent } from './dashboard-duty.component';

describe('DashboardDutyComponent', () => {
  let component: DashboardDutyComponent;
  let fixture: ComponentFixture<DashboardDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
