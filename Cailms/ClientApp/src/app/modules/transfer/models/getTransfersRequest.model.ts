import {TransferFilterModel} from './transferFilter.model';

export class GetTransfersRequest extends TransferFilterModel{
  page: number;
  take: number;

  constructor(page: number, take: number) {
    super();
    this.page = page;
    this.take = take;
  }
}
