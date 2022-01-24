import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonalabteilungComponent } from './dashboard-personalabteilung.component';

describe('DashboardPersonalabteilungComponent', () => {
  let component: DashboardPersonalabteilungComponent;
  let fixture: ComponentFixture<DashboardPersonalabteilungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonalabteilungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonalabteilungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
