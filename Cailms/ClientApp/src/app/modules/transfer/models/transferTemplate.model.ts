import {TransferType} from './transferType.enum';

export class TransferTemplate {
  id: string;
  templateName: string;
  name: string;
  value?: number;
  description?: string;
  type?: TransferType;
  category?: string;
  tags?: Array<string>;
}
