import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {TotalIncomeOutcome} from '../../../statistics/models/totalIncomeOutcome.model';
import {TransferType} from '../../models/transferType.enum';

@Component({
  selector: 'app-transfers-total-panel',
  templateUrl: './transfers-total-panel.component.html',
  styleUrls: ['./transfers-total-panel.component.scss']
})
export class TransfersTotalPanelComponent implements OnInit {

  @Input() total: TotalIncomeOutcome;

  TransferType = TransferType;
  difference = 0;
  differenceType: TransferType = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.difference = changes.total.currentValue.income - changes.total.currentValue.outcome;
    if (this.difference !== 0) {
      this.differenceType = this.difference > 0 ? TransferType.Income : TransferType.Outcome;
    }
  }

  buildDisplayValue = (type: TransferType, value: number) => {
    if (type === null) {
      return value;
    }
    return (type === TransferType.Outcome ? '-' : '+') + value;
  }

  abs = (value: number) => Math.abs(value);

}
