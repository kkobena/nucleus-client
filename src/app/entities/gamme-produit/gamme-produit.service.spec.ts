import { TestBed } from '@angular/core/testing';

import { GammeProduitService } from './gamme-produit.service';

describe('GammeProduitService', () => {
  let service: GammeProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GammeProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
