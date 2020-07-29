import { TestBed } from '@angular/core/testing';

import { GroupeFournisseurService } from './groupe-fournisseur.service';

describe('GroupeFournisseurService', () => {
  let service: GroupeFournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeFournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
