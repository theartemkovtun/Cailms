import {TransferType} from './transferType.enum';

export class Transfer {
  id: string;
  name: string;
  description: string;
  value: number;
  date?: Date;
  type: TransferType;
  category: string;
  tags: Array<string>;

  constructor() {
    this.date = new Date();
    this.type = TransferType.Outcome;
    this.value = 0;
    this.tags = [];
  }
}
