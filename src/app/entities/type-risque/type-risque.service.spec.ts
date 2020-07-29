import { TestBed } from '@angular/core/testing';

import { TypeRisqueService } from './type-risque.service';

describe('TypeRisqueService', () => {
  let service: TypeRisqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRisqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
