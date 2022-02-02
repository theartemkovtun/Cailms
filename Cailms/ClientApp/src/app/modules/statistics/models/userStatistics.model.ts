import {TotalIncomeOutcome} from './totalIncomeOutcome.model';
import {CategoryOutcome} from './categoryOutcome.model';

export class UserStatistics {
  total: TotalIncomeOutcome;
  categories: Array<CategoryOutcome>;
}
