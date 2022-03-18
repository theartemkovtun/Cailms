import {Component, OnInit} from '@angular/core';
import {TransferService} from '../../../../services/transfer.service';
import {TransferType} from '../../../transfer/models/transferType.enum';
import {Transfer} from '../../../transfer/models/transfer.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SavedTransferFilterEditModalComponent} from '../../../transfer/components/saved-transfer-filter-edit-modal/saved-transfer-filter-edit-modal.component';
import {JobService} from '../../../../services/job.service';

@Component({
  selector: 'app-job-create-edit',
  templateUrl: './job-create-edit.component.html',
  styleUrls: ['./job-create-edit.component.scss']
})
export class JobCreateEditComponent implements OnInit {

  jobId: string = null;
  categoryOptions = [];
  tagOptions = [];
  transfer = new Transfer();
  currentStep = 0;
  selectedDays = new Array<number>();
  jobName: string;

  constructor(private transferService: TransferService,
              private jobService: JobService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {
    this.jobId = this.activatedRoute.snapshot.params.jobId;
  }

  ngOnInit(): void {
    if (this.jobId) {
      this.jobService.getJob(this.jobId).subscribe(job => {
        this.transfer = {
          id: null,
          date: null,
          name: job.name,
          description: job.description,
          type: job.type,
          value: job.value,
          category: job.category,
          tags: job.tags
        };
        this.selectedDays = job.days;
        this.jobName = job.jobName;
      });
    }


    this.updateOptions();
  }

  previous = () => this.currentStep -= 1;

  next = () => this.currentStep += 1;

  save = () => {
    const dialogRef = this.dialog.open(SavedTransferFilterEditModalComponent, {
      autoFocus: false,
      width: '600px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: this.jobName
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const job = {
          id: this.jobId,
          jobName: name,
          name: this.transfer.name,
          value: this.transfer.value,
          description: this.transfer.description,
          type: this.transfer.type,
          category: this.transfer.category,
          tags: this.transfer.tags,
          days: this.selectedDays,
          isCollapsed: false,
          isActive: true
        };

        if (this.jobId) {
          this.jobService.updateJob(job).subscribe(_ => this.router.navigate(['/', 'jobs']));
        }
        else {
          this.jobService.addJob(job).subscribe(_ => this.router.navigate(['/', 'jobs']));
        }
      }
    });
  }

  updateOptions = () => {
    this.transferService.getUserCategories().subscribe(categories => this.categoryOptions = [...new Set(categories.map(c => c.value))]);
    this.transferService.getUserTags().subscribe(tags => this.tagOptions = [...new Set(tags.map(c => c.value))]);
  }

  isFormCompleted = () => {
    const sharedRequirements = this.transfer.name != null && this.transfer.value !== 0;
    if (this.transfer.type === TransferType.Outcome) {
      return sharedRequirements && this.transfer.category != null;
    }
    return sharedRequirements;
  }

  isNextButtonDisabled = () => {
    return this.currentStep === 0 && !this.isFormCompleted() || this.currentStep === 1 && this.selectedDays.length === 0;
  }

  isNoteDisplayed = () => {
    return this.currentStep === 1 && (this.selectedDays.includes(29) || this.selectedDays.includes(30) || this.selectedDays.includes(31));
  }

  getJobModel = () => {
    return {
      id: null,
      jobName: null,
      name: this.transfer.name,
      description: this.transfer.description,
      value: this.transfer.value,
      category: this.transfer.category,
      type: this.transfer.type,
      tags: this.transfer.tags,
      days: this.selectedDays
    };
  }
}
