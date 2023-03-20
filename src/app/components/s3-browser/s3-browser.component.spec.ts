import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3BrowserComponent } from './s3-browser.component';

describe('S3BrowserComponent', () => {
  let component: S3BrowserComponent;
  let fixture: ComponentFixture<S3BrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3BrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3BrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
