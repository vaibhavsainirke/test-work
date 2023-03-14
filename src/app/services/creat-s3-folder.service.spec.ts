import { TestBed } from '@angular/core/testing';

import { CreatS3FolderService } from './creat-s3-folder.service';

describe('CreatS3FolderService', () => {
  let service: CreatS3FolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatS3FolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
