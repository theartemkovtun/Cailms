import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CurrencyExchangeModel} from '../../models/currencyExchange.model';
import {Currency} from '../../models/currency.enum';

@Component({
  selector: 'app-currency-exchange-modal',
  templateUrl: './currency-exchange-modal.component.html',
  styleUrls: ['./currency-exchange-modal.component.scss']
})
export class CurrencyExchangeModalComponent implements OnInit {

  Currency = Currency;

  constructor(public dialog: MatDialogRef<CurrencyExchangeModalComponent>,
              @Inject(MAT_DIALOG_DATA) public model: CurrencyExchangeModel) { }

  ngOnInit(): void {
    if (this.model == null) {
      this.model = new CurrencyExchangeModel();
    }
  }

  closeModal = () => {
    this.dialog.close();
  }

  convert = () => {
    this.dialog.close(this.model);
  }

}
