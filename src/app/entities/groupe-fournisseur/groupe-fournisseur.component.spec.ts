import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeFournisseurComponent } from './groupe-fournisseur.component';

describe('GroupeFournisseurComponent', () => {
  let component: GroupeFournisseurComponent;
  let fixture: ComponentFixture<GroupeFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
