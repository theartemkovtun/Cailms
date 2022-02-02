import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PeriodIncomeOutcome} from '../../models/periodIncomeOutcome.model';
import {PeriodBarTypeEnum} from '../../models/periodBarType.enum';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-period-income-outcome-bar-chart',
  templateUrl: './period-income-outcome-bar-chart.component.html',
  styleUrls: ['./period-income-outcome-bar-chart.component.scss']
})
export class PeriodIncomeOutcomeBarChartComponent implements OnInit {

  @ViewChild('barChart') barChart: UIChart;
  @Input() data: Array<PeriodIncomeOutcome> = [];

  PeriodBarTypeEnum = PeriodBarTypeEnum;

  type = PeriodBarTypeEnum.All;
  barData: any;
  basicOptions = {
    legend: {
      display: false
    },
    scales: {
      x: {
        ticks: {
          display: false,
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      yAxes: [{
        categoryPercentage: 1,
        barPercentage: 1,
        ticks: {
          beginAtZero: 0
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
    }
  };
  datasets = [];

  constructor() { }

  ngOnInit(): void {
  }

  isNoData = () => {
    const totalSum = this.data?.reduce((sum: number, o: PeriodIncomeOutcome) => sum + o.income + o.outcome, 0);
    return this.data == null || this.data.length === 0 || totalSum === 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.datasets = [
      {
        label: 'Income',
        backgroundColor: '#00b309',
        data: changes.data.currentValue?.map(o => o.income)
      },
      {
        label: 'Outcome',
        backgroundColor: '#e60f00',
        data: changes.data.currentValue?.map(o => o.outcome)
      }
    ];
    this.barData = {
      labels: changes.data.currentValue?.map(o => o.label),
      datasets: this.datasets
    };
  }

  changeType = (type: PeriodBarTypeEnum) => {
    this.type = type;
    this.rebuildBarChart();
  }

  rebuildBarChart = () => {
    if (this.type === PeriodBarTypeEnum.All) {
      this.barData.datasets = this.datasets;
    }
    else if (this.type === PeriodBarTypeEnum.Income) {
      this.barData.datasets = this.datasets.filter(d => d.label === 'Income');
    }
    else {
      this.barData.datasets = this.datasets.filter(d => d.label === 'Outcome');
    }
    this.barChart.refresh();
  }

}
