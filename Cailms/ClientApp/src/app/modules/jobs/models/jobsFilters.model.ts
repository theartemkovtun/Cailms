import {JobsOrderField} from './enums/jobsOrderField.enum';
import {Order} from '../../../shared/models/enums/order.enum';

export class JobsFilters {
  field: JobsOrderField;
  order: Order;

  constructor() {
    this.field = JobsOrderField.CreatedOn;
    this.order = Order.Descending;
  }
}
