import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DayTransfers} from '../../../statistics/models/dayTransfers.model';
import {GetTransfersRequest} from '../../models/getTransfersRequest.model';
import {TransferService} from '../../../../services/transfer.service';
import {TotalIncomeOutcome} from '../../../statistics/models/totalIncomeOutcome.model';
import {TransferType} from '../../models/transferType.enum';
import {TwoStateButtonModel} from '../../../../shared/models/twoStateButtonModel.model';
import {MatDialog} from '@angular/material/dialog';
import {SavedTransferFilterEditModalComponent} from '../../components/saved-transfer-filter-edit-modal/saved-transfer-filter-edit-modal.component';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ConfirmType} from '../../../../shared/models/confirmType.enum';

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

  TransferType = TransferType;

  savedFilters: Array<TwoStateButtonModel>;
  defaultFilters: Array<TwoStateButtonModel>;

  type: TransferType = null;
  total = new TotalIncomeOutcome();
  queryParams: Params;
  isMoreTransfers = false;
  userTransfers: Array<DayTransfers> = [];
  getUserTransfersRequest = new GetTransfersRequest(1, 10);
  isFiltersDisplayed = false;




  constructor( private activatedRoute: ActivatedRoute,
               private transferService: TransferService,
               private router: Router,
               public dialog: MatDialog)
  {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    const [currentMonthStartDate, currentMonthEndDate] = this.getCurrentMonthStartAndEndDate();
    const [currentYearStartDate, currentYearEndDate] = this.getCurrentYearStartAndEndDate();
    this.defaultFilters = [
      {
        id: null,
        label: 'Current Month',
        isActive: false,
        data: {
          startDate: currentMonthStartDate,
          endDate: currentMonthEndDate
        }
      },
      {
        id: null,
        label: 'Current Year',
        isActive: false,
        data: {
          startDate: currentYearStartDate,
          endDate: currentYearEndDate
        }
      }
    ];
    this.savedFilters = this.defaultFilters;
  }


  ngOnInit(): void {
    this.clearAllFilters();
    this.getFilterOptions();
    this.updateSavedFilters();
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
    return this.type === null && this.dates.length === 0 && this.selectedCategories.length === 0 && this.selectedTags.length === 0;
  }

  clearAllFilters = () => {
    this.type = null;
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
    this.getUserTransfersRequest.type = this.type;
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

  filterTemplateButtonStateChanged = (filter: TwoStateButtonModel) => {
    this.savedFilters.filter(b => b.label !== filter.label).forEach(b => b.isActive = false);

    if (filter.isActive) {
      this.dates = filter.data.startDate !== null && filter.data.endDate !== null ? [new Date(filter.data.startDate), new Date(filter.data.endDate)] : [];
      this.selectedCategories = filter.data.categories;
      this.selectedTags = filter.data.tags;
      this.type = filter.data.type ?? null;

      this.filtersUpdated();
    }
    else {
      this.clearAllFilters();
    }
  }

  getCurrentMonthStartAndEndDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    return [new Date(currentYear, currentMonth, 1, 23, 59, 59), new Date(currentYear, currentMonth + 1, 0, 23, 59, 59)];
  }

  getCurrentYearStartAndEndDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    return [new Date(currentYear, 0, 1, 23, 59, 59), new Date(currentYear, 12, 0, 23, 59, 59)];
  }

  saveFilters = () => {
    const dialogRef = this.dialog.open(SavedTransferFilterEditModalComponent, {
      autoFocus: false,
      width: '600px',
      backdropClass: 'explicit-overlay-dark-backdrop',
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name !== null) {
        const isDateRangeNotEmpty = this.dates.length !== 0;
        this.transferService.addSavedTransfersFilter({
          name,
          type: this.type,
          startDate: isDateRangeNotEmpty ? this.dates[0] : null,
          endDate: isDateRangeNotEmpty ? this.dates[1] : null,
          categories: this.selectedCategories,
          tags: this.selectedTags
        }).subscribe(_ => this.updateSavedFilters());
      }
    });
  }

  updateSavedFilters = () => {
    this.transferService.getUserSavedTransferFilters().subscribe(filters => {
      if (filters != null) {
        this.savedFilters = this.defaultFilters.concat(filters.map(filter => {
          return {
            id: filter.id,
            label: filter.name,
            isActive: false,
            data: {
              startDate: filter.startDate,
              endDate: filter.endDate,
              type: filter.type,
              categories: filter.categories,
              tags: filter.tags
            }
          };
        }));
      }
      else {
        this.savedFilters = this.defaultFilters;
      }
    });
  }

  renameSavedFilter = (model: TwoStateButtonModel) => {
    const dialogRef = this.dialog.open(SavedTransferFilterEditModalComponent, {
      autoFocus: false,
      width: '600px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: model.label
    });

    dialogRef.afterClosed().subscribe(name => {
      this.transferService.renameSavedTransfersFilter(model.id, name).subscribe(_ => this.updateSavedFilters());
    });
  }

  deleteSavedFilter = (model: TwoStateButtonModel) => {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      autoFocus: false,
      width: '400px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: {
        message: 'Do you really want to delete this saved filter?',
        type: ConfirmType.Danger,
        confirmMessage: 'Yes, delete',
        cancelMessage: 'No, keep'
      }
    });

    dialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.transferService.deleteSavedTransfersFilter(model.id).subscribe(_ => {
          this.updateSavedFilters();
        });
      }
    });
  }
}
