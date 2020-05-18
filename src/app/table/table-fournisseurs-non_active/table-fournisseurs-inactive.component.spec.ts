import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFournisseursInactiveComponent } from './table-fournisseurs-inactive.component';

describe('TableFournisseursComponent', () => {
  let component: TableFournisseursInactiveComponent;
  let fixture: ComponentFixture<TableFournisseursInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFournisseursInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFournisseursInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
