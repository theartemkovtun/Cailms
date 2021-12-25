import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  data = [
    {
      date: 'December 13, 2021',
      items: [
        {
          item: 'Products',
          price: 13.12
        },
        {
          item: 'Coffee',
          price: 3.25
        }]
    },
    {
      date: 'December 11, 2021',
      items: [
        {
          item: 'Coffee',
          price: 3.25
        }]
    }
  ];

  chartData = {
    labels: ['Spent', 'Earned'],
    datasets: [
      {
        data: [40380.11, 85134.34],
        backgroundColor: [
          '#e60f00',
          '#00b309',
        ],
        hoverBackgroundColor: [
          '#8a3000',
          '#006b05',
        ]
      }
    ]
  };

  chartDataEmpty = {
    labels: ['No data'],
    datasets: [
      {
        data: [1],
        backgroundColor: [
          '#ededed',
        ],
        hoverBackgroundColor: [
          '#ababab',
        ]
      }
    ]
  };

  chartOptions = {
    legend: {display: false}
  };

  basicData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
      '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    datasets: [
      {
        label: 'Spent',
        backgroundColor: '#e60f00',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 0, 10, 11],
      },
      {
        label: 'Earned',
        backgroundColor: '#00b309',
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 0, 10, 11],
      }
    ]
  };

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
}
