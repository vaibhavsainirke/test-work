import { TestBed } from '@angular/core/testing';

import { ContextMenuItemsService } from './context-menu-items.service';

describe('ContextMenuItemsService', () => {
  let service: ContextMenuItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextMenuItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
