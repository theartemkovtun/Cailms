import {TransferType} from './transferType.enum';

export class GetTransfersRequest {
  page: number;
  take: number;
  startDate?: Date;
  endDate?: Date;
  type?: TransferType;
  categories: Array<string> = [];
  tags: Array<string> = [];

  constructor(page: number, take: number) {
    this.page = page;
    this.take = take;
  }
}
