import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';
import {GetTransfersRequest} from '../../models/getTransfersRequest.model';
import {TransferService} from '../../../../services/transfer.service';
import {TotalIncomeOutcome} from '../../../statistics/models/totalIncomeOutcome.model';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  dateFormat = 'dd MMMM, yyyy';
  dates = [];
  categoryOptions = [];
  tagOptions = [];

  total = new TotalIncomeOutcome();
  queryParams: Params;
  isMoreTransfers = false;
  userTransfers: Array<DayTransfers> = [];
  getUserTransfersRequest = new GetTransfersRequest(1, 10);

  constructor( private activatedRoute: ActivatedRoute,
               private transferService: TransferService,
               private router: Router)
  {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
  }

  ngOnInit(): void {
    this.setFiltersByQueryParams();
    this.getFilterOptions();
    this.getUserTransfers();
  }

  getUserTransfers = () => {
    this.transferService.getUserTransfers(this.getUserTransfersRequest).subscribe(data => {
      this.isMoreTransfers = data.isMore;
      this.total = data.total;
      if (data.items?.length > 0) {
        this.userTransfers = this.userTransfers.concat(data.items);
      }
    });
  }

  getFilterOptions = () => {
    this.transferService.getUserCategories().subscribe(categories => this.categoryOptions = [... new Set(categories.map(c => c.value))]);
    this.transferService.getUserTags().subscribe(tags => this.tagOptions = [... new Set(tags.map(c => c.value))]);
  }

  backToStatistics = () => {
    this.router.navigate(['/']);
  }

  loadMoreTransfers = () => {
    this.getUserTransfersRequest.page++;
    this.getUserTransfers();
  }

  isClearAllButtonDisabled = () => {
    return this.dates.length === 0 && this.getUserTransfersRequest.categories.length === 0 && this.getUserTransfersRequest.tags.length === 0;
  }

  clearAllFilters = () => {
    this.dates = [];
    this.getUserTransfersRequest.categories = [];
    this.getUserTransfersRequest.tags = [];
    this.filtersUpdated();
  }

  filtersUpdated = () => {
    this.setRequestDatesFilters();
    this.getUserTransfersRequest.page = 1;
    this.getUserTransfersRequest.take = 10;
    this.userTransfers = [];
    this.getUserTransfers();
  }

  setFiltersByQueryParams = () => {
    this.dates = [new Date(this.queryParams.startDate), new Date(this.queryParams.endDate)];
    this.setRequestDatesFilters();
  }

  setRequestDatesFilters = () => {
    const isDateRangeNotEmpty = this.dates.length !== 0;
    this.getUserTransfersRequest.startDate = isDateRangeNotEmpty ? this.dates[0] : null;
    this.getUserTransfersRequest.endDate = isDateRangeNotEmpty ? this.dates[1] : null;
  }


  updateQueryParams = () => {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          startDate: this.getUserTransfersRequest.startDate.toISOString().slice(0, 10),
          endDate: this.getUserTransfersRequest.endDate.toISOString().slice(0, 10),
          categories: this.getUserTransfersRequest.categories,
          tags: this.getUserTransfersRequest.tags
        },
        queryParamsHandling: 'merge',
      });
  }
}