import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreateEditComponent } from './job-create-edit.component';

describe('JobCreateEditComponent', () => {
  let component: JobCreateEditComponent;
  let fixture: ComponentFixture<JobCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
