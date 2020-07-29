import { TestBed } from '@angular/core/testing';

import { FamilleProduitService } from './famille-produit.service';

describe('FamilleProduitService', () => {
  let service: FamilleProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilleProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
