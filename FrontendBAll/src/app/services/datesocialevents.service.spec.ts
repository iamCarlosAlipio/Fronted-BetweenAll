import { TestBed } from '@angular/core/testing';

import { DatesocialeventsService } from './datesocialevents.service';

describe('DatesocialeventsService', () => {
  let service: DatesocialeventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatesocialeventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
