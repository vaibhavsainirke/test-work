import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridContextMenuComponent } from './ag-grid-context-menu.component';

describe('AgGridContextMenuComponent', () => {
  let component: AgGridContextMenuComponent;
  let fixture: ComponentFixture<AgGridContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
