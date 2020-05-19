import { TestBed } from '@angular/core/testing';

import { ApiCollectionService } from './api-collection.service';

describe('ApiCollectionService', () => {
  let service: ApiCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
