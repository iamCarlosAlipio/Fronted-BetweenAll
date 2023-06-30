import { TestBed } from '@angular/core/testing';

import { GroupUserService } from './group-user.service';

describe('GroupUserService', () => {
  let service: GroupUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
