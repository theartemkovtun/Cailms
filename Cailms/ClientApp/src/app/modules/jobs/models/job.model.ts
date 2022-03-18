import {TransferType} from '../../transfer/models/transferType.enum';

export class Job {
  id: string;
  jobName: string;
  name: string;
  value: number;
  description: string;
  type: TransferType;
  category: string;
  tags: Array<string>;
  days: Array<number>;
  isActive: boolean;
  isCollapsed = true;
}
