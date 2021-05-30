import { TestBed } from '@angular/core/testing';

import { NewsBingService } from './news-bing.service';

describe('NewsBingService', () => {
  let service: NewsBingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsBingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
