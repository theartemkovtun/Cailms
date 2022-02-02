import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {TransferType} from '../../models/transferType.enum';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';
import {Router} from '@angular/router';
import {TransferService} from '../../../../services/transfer.service';

@Component({
  selector: 'app-transfers-list',
  templateUrl: './transfers-list.component.html',
  styleUrls: ['./transfers-list.component.scss']
})
export class TransfersListComponent implements OnInit {

  @Input() transfers: Array<DayTransfers> = [];

  constructor() { }

  ngOnInit(): void {
  }
}
