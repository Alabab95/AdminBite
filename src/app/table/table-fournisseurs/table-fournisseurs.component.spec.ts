import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFournisseursComponent } from './table-fournisseurs.component';

describe('TableFournisseursComponent', () => {
  let component: TableFournisseursComponent;
  let fixture: ComponentFixture<TableFournisseursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFournisseursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
