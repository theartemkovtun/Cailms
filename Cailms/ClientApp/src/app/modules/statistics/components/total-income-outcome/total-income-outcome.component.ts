import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {TotalIncomeOutcome} from '../../models/totalIncomeOutcome.model';

@Component({
  selector: 'app-total-income-outcome',
  templateUrl: './total-income-outcome.component.html',
  styleUrls: ['./total-income-outcome.component.scss']
})
export class TotalIncomeOutcomeComponent implements OnInit {

  @Input() data: TotalIncomeOutcome = new TotalIncomeOutcome();

  chartData: any;

  chartDataEmpty = {
    labels: ['No data'],
    datasets: [
      {
        data: [1],
        backgroundColor: [
          '#ededed',
        ]
      }
    ]
  };

  chartOptions = {
    legend: {display: false}
  };


  isNoData = () => this.data?.outcome === 0 && this.data?.income === 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

    this.chartData = {
      labels: ['Earned', 'Spent'],
      datasets: [
        {
          data: [changes.data.currentValue?.income, changes.data.currentValue?.outcome],
          backgroundColor: [
            '#00b309',
            '#e60f00'
          ],
          hoverBackgroundColor: [
            '#006b05',
            '#8a3000'
          ]
        }
      ]
    };
  }
}
