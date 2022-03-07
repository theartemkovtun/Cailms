import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';
import {TransferType} from '../../models/transferType.enum';
import {TotalIncomeOutcome} from '../../../statistics/models/totalIncomeOutcome.model';
import {TransferPreviewComponent} from '../transfer-preview/transfer-preview.component';
import {MatDialog} from '@angular/material/dialog';
import {Transfer} from '../../models/transfer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transfer-list-item',
  templateUrl: './transfer-list-item.component.html',
  styleUrls: ['./transfer-list-item.component.scss']
})
export class TransferListItemComponent implements OnInit {

  TransferType = TransferType;
  dayTotal: TotalIncomeOutcome = new TotalIncomeOutcome();
  isTotalShown = false;

  @Input() dayTransfers: DayTransfers;
  @Output() deleteDayTransfers = new EventEmitter<string>();

  constructor(public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    const transfers = this.dayTransfers.transfers;
    this.dayTotal.outcome = +transfers.filter(t => t.type === TransferType.Outcome)
      .reduce((sum, transfer) => sum + transfer.value, 0).toFixed(2);
    this.dayTotal.income = +transfers.filter(t => t.type === TransferType.Income)
      .reduce((sum, transfer) => sum + transfer.value, 0).toFixed(2);
  }

  buildDisplayValue = (type: TransferType, value: number) => {
    return (type === TransferType.Outcome ? '-' : '+') + value;
  }

  toggleTotalPanel = () => {
    this.isTotalShown = !this.isTotalShown;
  }

  previewTransfer = (transfer: Transfer) => {
    const dialogRef = this.dialog.open(TransferPreviewComponent, {
      autoFocus: false,
      width: '600px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: transfer
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response.refresh) {
        if (this.dayTransfers.transfers.length === 1) {
          this.deleteDayTransfers.emit(this.dayTransfers.date);
        }
        else {
          this.dayTransfers.transfers = this.dayTransfers.transfers.filter(t => t.id !== response.id);
        }
      }
    });
  }
}
