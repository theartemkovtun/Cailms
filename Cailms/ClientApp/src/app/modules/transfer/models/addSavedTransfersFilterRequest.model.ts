import {TransferType} from './transferType.enum';

export class AddSavedTransfersFilterRequest {
  name: string;
  startDate?: Date;
  endDate?: Date;
  type?: TransferType;
  categories: Array<string> = [];
  tags: Array<string> = [];
}
