import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatFolderComponent } from './creat-folder.component';

describe('CreatFolderComponent', () => {
  let component: CreatFolderComponent;
  let fixture: ComponentFixture<CreatFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
