import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardYardComponent } from './dashboard-yard.component';

describe('DashboardYardComponent', () => {
  let component: DashboardYardComponent;
  let fixture: ComponentFixture<DashboardYardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardYardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
