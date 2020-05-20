import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAbonnementsEnAttenteComponent } from './table-abonnements-enattente.component';

describe('TableAbonnementsEnAttenteComponent', () => {
  let component: TableAbonnementsEnAttenteComponent;
  let fixture: ComponentFixture<TableAbonnementsEnAttenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAbonnementsEnAttenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAbonnementsEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
