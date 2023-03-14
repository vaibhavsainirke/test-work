import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatDialogComponent } from './creat-dialog.component';

describe('CreatDialogComponent', () => {
  let component: CreatDialogComponent;
  let fixture: ComponentFixture<CreatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
