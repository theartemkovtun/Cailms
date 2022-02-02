import {Component, Input, OnInit} from '@angular/core';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';
import {Router} from '@angular/router';
import {TransferService} from '../../../../services/transfer.service';
import {TransferType} from '../../models/transferType.enum';
import {TotalIncomeOutcome} from '../../../statistics/models/totalIncomeOutcome.model';

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

  constructor(private router: Router,
              private transferService: TransferService) { }

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

  navigateToTransferEdit = (id: string) => {
    this.router.navigate(['transfer', id]);
  }

  deleteTransfer = (date: string, id: string) => {
    this.transferService.deleteTransfer(id).subscribe(_ => {
      const dayLeftTransfers = this.dayTransfers.transfers.filter(t => t.id !== id);
      if (dayLeftTransfers.length === 0) {
        // this.transfers = this.transfers.filter(d => d.date !== date);
      }
      else {
        this.dayTransfers.transfers = this.dayTransfers.transfers.filter(t => t.id !== id);
      }
    });
  }

  toggleTotalPanel = () => {
    this.isTotalShown = !this.isTotalShown;
  }
}
