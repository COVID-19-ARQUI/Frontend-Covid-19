import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardseditComponent } from './dashboardsedit.component';

describe('DashboardseditComponent', () => {
  let component: DashboardseditComponent;
  let fixture: ComponentFixture<DashboardseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
