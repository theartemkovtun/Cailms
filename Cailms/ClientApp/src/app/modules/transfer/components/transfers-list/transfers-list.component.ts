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

  isMonthDisplayed = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth();

    if (month !== this.currentMonth) {
      this.currentMonth = month;
      return true;
    }
    else {
      return false;
    }
  }
}
