import { TestBed } from '@angular/core/testing';

import { CreatBucketService } from './creat-bucket.service';

describe('CreatBucketService', () => {
  let service: CreatBucketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatBucketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
