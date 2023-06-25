import { TestBed } from '@angular/core/testing';

import { SocialeventsService } from './socialevents.service';

describe('SocialeventsService', () => {
  let service: SocialeventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialeventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
