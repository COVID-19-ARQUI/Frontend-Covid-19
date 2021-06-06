import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcumulatedGraphComponent } from './acumulated-graph.component';

describe('AcumulatedGraphComponent', () => {
  let component: AcumulatedGraphComponent;
  let fixture: ComponentFixture<AcumulatedGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcumulatedGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcumulatedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
