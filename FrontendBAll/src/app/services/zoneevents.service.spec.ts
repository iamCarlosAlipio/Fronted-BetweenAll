import { TestBed } from '@angular/core/testing';

import { ZoneeventsService } from './zoneevents.service';

describe('ZoneeventsService', () => {
  let service: ZoneeventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneeventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
