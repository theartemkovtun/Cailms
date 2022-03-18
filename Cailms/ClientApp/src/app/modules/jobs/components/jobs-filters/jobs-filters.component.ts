import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobsFilters} from '../../models/jobsFilters.model';
import {Order} from '../../../../shared/models/enums/order.enum';
import {JobsOrderField} from '../../models/enums/jobsOrderField.enum';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters.component.scss']
})
export class JobsFiltersComponent implements OnInit {

  JobsOrderField = JobsOrderField;
  Order = Order;

  @Input() filters = new JobsFilters();
  @Output() filtersChange = new EventEmitter<JobsFilters>();
  @Input() isExpandAllShow = true;
  @Output() expandCollapseClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  expandCollapseAll = (state: boolean) => {
    this.expandCollapseClicked.emit(state);
  }

  filtersUpdated = () => this.filtersChange.emit(this.filters);

}
