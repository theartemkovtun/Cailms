import {TransferType} from './transferType.enum';

export class TransferFilterModel {

  startDate?: Date;
  endDate?: Date;
  type?: TransferType;
  categories: Array<string> = [];
  tags: Array<string> = [];
}
