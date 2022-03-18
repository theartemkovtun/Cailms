import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JobService} from '../../../../services/job.service';
import {Job} from '../../models/job.model';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ConfirmType} from '../../../../shared/models/confirmType.enum';
import {MatDialog} from '@angular/material/dialog';
import {JobsFilters} from '../../models/jobsFilters.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  jobs = [];
  filters = new JobsFilters();

  constructor(private router: Router,
              public dialog: MatDialog,
              private jobService: JobService) { }

  ngOnInit(): void {
    this.getJobs();
  }

  newJob = () => {
    this.router.navigate(['/', 'jobs', 'new']);
  }

  getJobs = () => {
    this.jobService.getUserJobs(this.filters).subscribe(jobs => this.jobs = jobs);
  }

  deleteJob = (job: Job) => {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      autoFocus: false,
      width: '500px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: {
        message: `Do you really want to delete '${job.jobName}' job?`,
        type: ConfirmType.Danger,
        confirmMessage: 'Yes, delete',
        cancelMessage: 'No, keep'
      }
    });

    dialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.jobService.deleteJob(job.id).subscribe(_ => {
          this.getJobs();
        });
      }
    });
  }

  toggleJobState = (job: Job) => {
    this.jobService.toggleJobStatus(job.id).subscribe(_ => job.isActive = !job.isActive);
  }

  editJob = (job: Job) => {
    this.router.navigate(['/', 'jobs', job.id]);
  }

  setAllJobsCollapsedState = (state: boolean) => {
    this.jobs.forEach(j => j.isCollapsed = state);
  }

  isAllJobsCollapsed = () => {
    return this.jobs.every(j => j.isCollapsed);
  }
}
