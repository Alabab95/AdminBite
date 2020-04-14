import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GFournisseursComponent } from './g-fournisseurs.component';

describe('GFournisseursComponent', () => {
  let component: GFournisseursComponent;
  let fixture: ComponentFixture<GFournisseursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GFournisseursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
