import { TestBed } from '@angular/core/testing';

import { UserCategoryService } from './user-category.service';

describe('UserCategoryService', () => {
  let service: UserCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
