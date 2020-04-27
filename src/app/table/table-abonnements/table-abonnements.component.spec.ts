import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAbonnementsComponent } from './table-abonnements.component';

describe('TableAbonnementsComponent', () => {
  let component: TableAbonnementsComponent;
  let fixture: ComponentFixture<TableAbonnementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAbonnementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
