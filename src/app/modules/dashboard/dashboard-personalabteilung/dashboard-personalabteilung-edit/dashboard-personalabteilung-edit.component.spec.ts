import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonalabteilungEditComponent } from './dashboard-personalabteilung-edit.component';

describe('DashboardPersonalabteilungEditComponent', () => {
  let component: DashboardPersonalabteilungEditComponent;
  let fixture: ComponentFixture<DashboardPersonalabteilungEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonalabteilungEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonalabteilungEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
