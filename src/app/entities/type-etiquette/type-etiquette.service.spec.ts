import { TestBed } from '@angular/core/testing';

import { TypeEtiquetteService } from './type-etiquette.service';

describe('TypeEtiquetteService', () => {
  let service: TypeEtiquetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEtiquetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
