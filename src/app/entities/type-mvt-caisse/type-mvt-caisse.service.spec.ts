import { TestBed } from '@angular/core/testing';

import { TypeMvtCaisseService } from './type-mvt-caisse.service';

describe('TypeMvtCaisseService', () => {
  let service: TypeMvtCaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMvtCaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
