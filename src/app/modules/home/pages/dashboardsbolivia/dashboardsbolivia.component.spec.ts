import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsboliviaComponent } from './dashboardsbolivia.component';

describe('DashboardsboliviaComponent', () => {
  let component: DashboardsboliviaComponent;
  let fixture: ComponentFixture<DashboardsboliviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsboliviaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsboliviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
