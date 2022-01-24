import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInitComponent } from './dashboard-init.component';

describe('DashboardInitComponent', () => {
  let component: DashboardInitComponent;
  let fixture: ComponentFixture<DashboardInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
