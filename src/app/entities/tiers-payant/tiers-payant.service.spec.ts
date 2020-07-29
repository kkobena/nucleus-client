import { TestBed } from '@angular/core/testing';

import { TiersPayantService } from './tiers-payant.service';

describe('TiersPayantService', () => {
  let service: TiersPayantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiersPayantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
