import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Month} from '../../models/month.enum';

@Component({
  selector: 'app-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.scss']
})
export class MonthYearPickerComponent implements OnInit {

  Month = Month;

  @Input() month: Month;
  @Output() monthChange = new EventEmitter<Month>();
  @Input() year: number;
  @Output() yearChange = new EventEmitter<number>();

  @Output() dateChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.month = currentDate.getMonth() + 1;
    this.year = currentDate.getFullYear();
  }

  selectMonth = (month: Month) => {
    if (!this.isMonthBlocked(month)) {
      this.month = month;
      this.monthChange.emit(this.month);
      this.dateChanged.emit();
    }
  }

  isMonthBlocked = (month: Month) => {
    const currentDate = new Date();
    return  month > currentDate.getMonth() + 1 && this.year >= currentDate.getFullYear();
  }

  previousYear = () => {
    this.year--;
    this.yearChange.emit(this.year);
    this.dateChanged.emit();
  }

  nextYear = () => {
    const currentDate = new Date();
    if (!this.isNextYearBlocked()) {
      this.year++;

      if (this.isMonthBlocked(this.month)) {
        this.month = currentDate.getMonth() + 1;
        this.monthChange.emit(this.month);
      }
      this.yearChange.emit(this.year);
      this.dateChanged.emit();
    }
  }

  isNextYearBlocked = () => {
    const currentDate = new Date();
    return currentDate.getFullYear() < this.year + 1;
  }
}
