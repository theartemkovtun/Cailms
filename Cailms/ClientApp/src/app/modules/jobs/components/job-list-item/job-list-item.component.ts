import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from '../../models/job.model';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss']
})
export class JobListItemComponent implements OnInit {

  @Input() job: Job;
  @Output() onDelete = new EventEmitter<Job>();
  @Output() onEdit = new EventEmitter<Job>();
  @Output() onStatusToggle = new EventEmitter<Job>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleInformationShow = () => {
    this.job.isCollapsed = !this.job.isCollapsed;
  }

  delete = () => this.onDelete.emit(this.job);
  edit = () => this.onEdit.emit(this.job);
  toggleStatus = () => this.onStatusToggle.emit(this.job);

}
