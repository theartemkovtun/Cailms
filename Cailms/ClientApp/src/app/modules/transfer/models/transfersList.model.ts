import {IsMorePagedCollection} from './isMorePagedCollection.model';
import {TotalIncomeOutcome} from '../../statistics/models/totalIncomeOutcome.model';
import {DayTransfers} from '../../statistics/models/dayTransfers.model';

export class TransfersListModel extends IsMorePagedCollection<DayTransfers>
{
  total: TotalIncomeOutcome;
}
