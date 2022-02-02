import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CategoryOutcome} from '../../models/categoryOutcome.model';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-categories-outcome',
  templateUrl: './categories-outcome.component.html',
  styleUrls: ['./categories-outcome.component.scss']
})
export class CategoriesOutcomeComponent implements OnInit {

  @ViewChild('pieChart') pieChart: UIChart;
  @Input() categoriesOutcome: Array<CategoryOutcome> = [];

  showScroll: boolean;
  chartOptions = {
    legend: {display: false}
  };
  chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  isNoData = () => {
    return this.categoriesOutcome == null  || this.categoriesOutcome?.length === 0;
  }

  ngOnChanges(changes: SimpleChanges){
    this.rebuildPie();
  }

  rebuildPie = () => {
    const categoriesToShow = this.categoriesOutcome?.filter(co => co.isShown);

    this.chartData.labels = categoriesToShow?.map(c => c.category);
    this.chartData.datasets[0].data = categoriesToShow?.map(c => c.spent);
    this.chartData.datasets[0].backgroundColor = categoriesToShow?.map(c => c.color);

    this.pieChart?.refresh();
  }
}
