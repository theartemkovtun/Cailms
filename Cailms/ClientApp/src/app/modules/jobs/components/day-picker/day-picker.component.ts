import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss']
})
export class DayPickerComponent implements OnInit {

  days = new Array(31);
  @Input() selectedDays: Array<number>;
  @Output() selectedDaysChange = new EventEmitter<Array<number>>();
  @Input() isReadonly = false;

  constructor() { }

  ngOnInit(): void {
  }

  isDaySelected = (day: number) => {
    return this.selectedDays.includes(day);
  }

  toggleDaySelect = (day: number) => {
    if (this.isDaySelected(day)) {
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
    }
    else {
      return this.selectedDays.push(day);
    }
    this.selectedDaysChange.emit(this.selectedDays);
  }

}
