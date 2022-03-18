import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPreviewComponent } from './job-preview.component';

describe('JobPreviewComponent', () => {
  let component: JobPreviewComponent;
  let fixture: ComponentFixture<JobPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
