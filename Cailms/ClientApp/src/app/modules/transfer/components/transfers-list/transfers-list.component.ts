import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';

@Component({
  selector: 'app-transfers-list',
  templateUrl: './transfers-list.component.html',
  styleUrls: ['./transfers-list.component.scss']
})
export class TransfersListComponent implements OnInit {

  @Input() transfers: Array<DayTransfers> = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth: number = null;

  constructor() { }

  ngOnInit(): void {
  }

  isMonthDisplayed = (dayTransfers: DayTransfers) => {
    const index = this.transfers.indexOf(dayTransfers);

    if (index === 0) {
      return true;
    }
    else {
      const currentRecordDate = new Date(dayTransfers.date);
      const previousRecordDate = new Date(this.transfers[index - 1].date);

      return currentRecordDate.getMonth() !== previousRecordDate.getMonth();
    }
  }


  getMonthString = (dateString: string) => {
    const date = new Date(dateString);
    return this.months[date.getMonth()];
  }
}
