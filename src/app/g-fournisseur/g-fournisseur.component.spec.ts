import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GFournisseurComponent } from './g-fournisseur.component';

describe('GFournisseurComponent', () => {
  let component: GFournisseurComponent;
  let fixture: ComponentFixture<GFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
