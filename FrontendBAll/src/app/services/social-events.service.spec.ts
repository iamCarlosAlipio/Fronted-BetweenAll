import { TestBed } from '@angular/core/testing';

import { SocialEventsService } from './social-events.service';

describe('SocialEventsService', () => {
  let service: SocialEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
