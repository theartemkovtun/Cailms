import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodIncomeOutcomeBarChartComponent } from './period-income-outcome-bar-chart.component';

describe('PeriodIncomeOutcomeBarChartComponent', () => {
  let component: PeriodIncomeOutcomeBarChartComponent;
  let fixture: ComponentFixture<PeriodIncomeOutcomeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodIncomeOutcomeBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodIncomeOutcomeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
