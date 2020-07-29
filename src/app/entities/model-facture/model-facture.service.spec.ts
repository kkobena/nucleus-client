import { TestBed } from '@angular/core/testing';

import { ModelFactureService } from './model-facture.service';

describe('ModelFactureService', () => {
  let service: ModelFactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelFactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
