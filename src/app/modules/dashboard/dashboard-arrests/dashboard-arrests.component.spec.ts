import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArrestsComponent } from './dashboard-arrests.component';

describe('DashboardArrestsComponent', () => {
  let component: DashboardArrestsComponent;
  let fixture: ComponentFixture<DashboardArrestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardArrestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardArrestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
