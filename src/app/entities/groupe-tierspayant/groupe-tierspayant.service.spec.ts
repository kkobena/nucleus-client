import { TestBed } from '@angular/core/testing';

import { GroupeTierspayantService } from './groupe-tierspayant.service';

describe('GroupeTierspayantService', () => {
  let service: GroupeTierspayantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeTierspayantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
