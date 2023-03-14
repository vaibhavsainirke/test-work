import { TestBed } from '@angular/core/testing';

import { DeleteBucketService } from './delete-bucket.service';

describe('DeleteBucketService', () => {
  let service: DeleteBucketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBucketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
