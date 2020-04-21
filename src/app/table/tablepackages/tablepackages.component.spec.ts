import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablepackagesComponent } from './tablepackages.component';

describe('TablepackagesComponent', () => {
  let component: TablepackagesComponent;
  let fixture: ComponentFixture<TablepackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablepackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablepackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
