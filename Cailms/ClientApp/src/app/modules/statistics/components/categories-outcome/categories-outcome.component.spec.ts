import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOutcomeComponent } from './categories-outcome.component';

describe('CategoriesOutcomeComponent', () => {
  let component: CategoriesOutcomeComponent;
  let fixture: ComponentFixture<CategoriesOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
