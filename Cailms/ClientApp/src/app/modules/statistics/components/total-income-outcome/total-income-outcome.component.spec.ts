import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIncomeOutcomeComponent } from './total-income-outcome.component';

describe('TotalIncomeOutcomeComponent', () => {
  let component: TotalIncomeOutcomeComponent;
  let fixture: ComponentFixture<TotalIncomeOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalIncomeOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIncomeOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
