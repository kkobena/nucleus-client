import { TestBed } from '@angular/core/testing';

import { TypeInventaireService } from './type-inventaire.service';

describe('TypeInventaireService', () => {
  let service: TypeInventaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeInventaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
