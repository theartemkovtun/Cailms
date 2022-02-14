import {Component, OnInit} from '@angular/core';
import {Month} from '../../models/month.enum';
import {StatisticsService} from '../../../../services/statistics.service';
import {UserStatistics} from '../../models/userStatistics.model';
import {PeriodIncomeOutcome} from '../../models/periodIncomeOutcome.model';
import {TransferService} from '../../../../services/transfer.service';
import {DayTransfers} from '../../models/dayTransfers.model';
import {GetTransfersRequest} from '../../../transfer/models/getTransfersRequest.model';
import {Router} from '@angular/router';
import {CategoryOutcome} from '../../models/categoryOutcome.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  Month = Month;
  month: Month;
  year: number;
  statistics: UserStatistics = new UserStatistics();
  periodStatistics: Array<PeriodIncomeOutcome>;
  getUserTransfersRequest = new GetTransfersRequest(1, 3);

  constructor(public statisticsService: StatisticsService,
              public transferService: TransferService,
              private router: Router) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.month = currentDate.getMonth() + 1;
    this.year = currentDate.getFullYear();
    this.dateChanged();
  }

  updateUserStatistics = () => {
    this.statisticsService.getUserStatistics(this.month, this.year).subscribe(data => {
      this.statistics.total = data.total;
      this.statistics.categories = data.categories?.map(c => new CategoryOutcome(c.category, c.spent, c.color));
    });
    this.statisticsService.getUserPeriodStatistics(this.month, this.year).subscribe(data => this.periodStatistics = data);
  }

  getUserLatestTransfers = () => {
    const [startDate, endDate] = this.getCurrentPeriodStartAndEndDate();
    this.getUserTransfersRequest.startDate = startDate;
    this.getUserTransfersRequest.endDate = endDate;
  }

  dateChanged = () => {
    this.updateUserStatistics();
    this.getUserLatestTransfers();
  }

  navigateToTransfers = () => {
    const [startDate, endDate] = this.getCurrentPeriodStartAndEndDate();
    this.router.navigate(['transfers'], {queryParams: {
      startDate: startDate.toISOString().slice(0, 10), endDate: endDate.toISOString().slice(0, 10)}});
  }

  getCurrentPeriodStartAndEndDate = () => {
    if (this.month === null) {
      return [new Date(this.year, 0, 1, 23, 59, 59), new Date(this.year, 11, 31, 23, 59, 59)];
    }
    else {
      return [new Date(this.year, this.month - 1, 1, 23, 59, 59), new Date(this.year, this.month, 0, 23, 59, 59)];
    }
  }
}
