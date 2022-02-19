import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = [];

  currentMonthIndex: number;
  currentMonth: string;
  currentYear: string;

  constructor() { }

  ngOnInit(): void {
    this.setToToday();
    this.getYears();
  }

  setToToday = () => {
    this.date = new Date();
    this.currentMonthIndex = this.date.getMonth();
    this.currentMonth = this.months[this.currentMonthIndex];
    this.currentYear = this.date.getFullYear().toString();
    this.dateChange.emit(this.date);
  }

  monthChanged = (month: string) => {
    const monthIndex = this.months.indexOf(month);
    this.date = new Date(this.date.getFullYear(), monthIndex, this.date.getDate());
    this.dateChange.emit(this.date);

  }

  yearChanged = (year: string) => {
    const newYear = +year;
    this.date = new Date(+newYear, this.date.getMonth(), this.date.getDate());
    this.dateChange.emit(this.date);
  }

  getYears = () => {
    let yearRunner = 1900;
    const currentYear = this.date.getFullYear();
    while (yearRunner <= currentYear) {
      this.years.push(yearRunner.toString());
      yearRunner++;
    }
  }

  calendarDateChange = () => {
    this.currentMonthIndex = this.date.getMonth();
    this.currentMonth = this.months[this.currentMonthIndex];
    this.currentYear = this.date.getFullYear().toString();
    this.dateChange.emit(this.date);
  }
}
