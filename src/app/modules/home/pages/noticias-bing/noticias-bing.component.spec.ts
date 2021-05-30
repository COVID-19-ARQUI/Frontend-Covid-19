import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasBingComponent } from './noticias-bing.component';

describe('NoticiasBingComponent', () => {
  let component: NoticiasBingComponent;
  let fixture: ComponentFixture<NoticiasBingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasBingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasBingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
