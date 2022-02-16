import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';
import {GetTransfersRequest} from '../../models/getTransfersRequest.model';
import {TransferService} from '../../../../services/transfer.service';
import {TotalIncomeOutcome} from '../../../statistics/models/totalIncomeOutcome.model';
import {PeriodBarTypeEnum} from '../../../statistics/models/periodBarType.enum';

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
  selectedCategories = [];
  selectedTags = [];

  PeriodBarTypeEnum = PeriodBarTypeEnum;

  type = PeriodBarTypeEnum.All;
  total = new TotalIncomeOutcome();
  queryParams: Params;
  isMoreTransfers = false;
  userTransfers: Array<DayTransfers> = [];
  getUserTransfersRequest = new GetTransfersRequest(1, 10);
  isFiltersDisplayed = false;

  constructor( private activatedRoute: ActivatedRoute,
               private transferService: TransferService,
               private router: Router)
  {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
  }

  ngOnInit(): void {
    this.clearAllFilters();
    this.getFilterOptions();
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

  isFiltersEmpty = () => {
    return this.type === PeriodBarTypeEnum.All && this.dates.length === 0 && this.selectedCategories.length === 0 && this.selectedTags.length === 0;
  }

  clearAllFilters = () => {
    this.type = PeriodBarTypeEnum.All;
    this.dates = [];
    this.selectedCategories = [];
    this.selectedTags = [];
    this.filtersUpdated();
  }

  filtersUpdated = () => {
    this.setRequestDatesFilters();
    this.getUserTransfersRequest.page = 1;
    this.getUserTransfersRequest.take = 10;
    this.getUserTransfersRequest.categories = this.selectedCategories;
    this.getUserTransfersRequest.tags = this.selectedTags;
    this.userTransfers = [];
    this.getUserTransfers();
  }

  setFiltersByQueryParams = () => {
    this.setRequestDatesFilters();
  }

  setRequestDatesFilters = () => {
    const isDateRangeNotEmpty = this.dates.length !== 0;
    this.getUserTransfersRequest.startDate = isDateRangeNotEmpty ? this.dates[0] : null;
    this.getUserTransfersRequest.endDate = isDateRangeNotEmpty ? this.dates[1] : null;
  }

  toggleFiltersDisplayStatus = () => {
    this.isFiltersDisplayed = !this.isFiltersDisplayed;
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
