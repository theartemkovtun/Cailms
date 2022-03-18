import {Component, Input, OnInit} from '@angular/core';
import {TransferType} from '../../../transfer/models/transferType.enum';
import {Job} from '../../models/job.model';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {

  @Input() job: Job;

  TransferType = TransferType;

  constructor() { }

  ngOnInit(): void {
  }

  selectedDayFormatted = () => {
    return this.job.days.join(',');
  }
}
