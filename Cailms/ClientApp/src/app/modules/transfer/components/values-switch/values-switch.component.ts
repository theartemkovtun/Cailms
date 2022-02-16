import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-values-switch',
  templateUrl: './values-switch.component.html',
  styleUrls: ['./values-switch.component.scss']
})
export class ValuesSwitchComponent implements OnInit {

  @Input() values: Array<string>;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() allowCircleSpin = false;

  currentValueIndex: number;

  constructor() { }

  ngOnInit(): void {
    this.currentValueIndex = this.values.indexOf(this.value);
  }

  prevValue = () => {

    if (this.isPrevValueSwitchBlocked()) {
      return;
    }

    this.currentValueIndex--;

    if (this.currentValueIndex < 0) {
      this.currentValueIndex = this.values.length - 1;
    }

    this.value = this.values[this.currentValueIndex];
    this.valueChange.emit(this.value);
  }

  nextValue = () => {

    if (this.isNextValueSwitchBlocked()) {
      return;
    }

    this.currentValueIndex++;

    if (this.currentValueIndex === this.values.length) {
      this.currentValueIndex = 0;
    }

    this.value = this.values[this.currentValueIndex];
    this.valueChange.emit(this.value);
  }

  isPrevValueSwitchBlocked = () => {
    if (this.allowCircleSpin) {
      return false;
    }

    return this.currentValueIndex - 1 < 0;
  }

  isNextValueSwitchBlocked = () => {
    if (this.allowCircleSpin) {
      return false;
    }

    return this.currentValueIndex + 1 > this.values.length - 1;

  }
}
