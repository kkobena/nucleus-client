import { TestBed } from '@angular/core/testing';

import { LaboratoireProduitService } from './laboratoire-produit.service';

describe('LaboratoireProduitService', () => {
  let service: LaboratoireProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoireProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
