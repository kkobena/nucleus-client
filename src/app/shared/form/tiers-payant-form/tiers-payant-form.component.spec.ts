import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiersPayantFormComponent } from './tiers-payant-form.component';

describe('TiersPayantFormComponent', () => {
  let component: TiersPayantFormComponent;
  let fixture: ComponentFixture<TiersPayantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiersPayantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiersPayantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
