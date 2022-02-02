import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundSectionComponent } from './background-section.component';

describe('BackgroundSectionComponent', () => {
  let component: BackgroundSectionComponent;
  let fixture: ComponentFixture<BackgroundSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
