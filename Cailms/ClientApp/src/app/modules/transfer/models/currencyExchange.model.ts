import {Currency} from './currency.enum';

export class CurrencyExchangeModel {
  from: Currency;
  to: Currency;
  value: number;
  date: Date;

  constructor() {
    this.from = Currency.UAH;
    this.to = Currency.USD;
  }
}
