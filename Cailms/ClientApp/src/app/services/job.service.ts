import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job} from '../modules/jobs/models/job.model';
import {Transfer} from '../modules/transfer/models/transfer.model';
import {JobsFilters} from '../modules/jobs/models/jobsFilters.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  addJob = (job: Job) => {
    return this.http.post<string>(`/api/v1/jobs`, {
      jobName: job.jobName,
      name: job.name,
      value: job.value,
      description: job.description,
      category: job.category,
      type: job.type,
      tags: job.tags,
      days: job.days
    });
  }

  getUserJobs(filter: JobsFilters): Observable<Array<Job>> {
    let params = new HttpParams();
    params = params.append('sortColumn', filter.field.toString());
    params = params.append('order', filter.order.toString());
    return this.http.get<Array<Job>>(`/api/v1/jobs`, {params});
  }

  deleteJob = (id: string) => {
    return this.http.delete(`/api/v1/jobs/${id}`);
  }

  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`/api/v1/Jobs/${id}`);
  }

  updateJob = (job: Job) => {
    return this.http.put<string>(`/api/v1/jobs`, {
      id: job.id,
      jobName: job.jobName,
      name: job.name,
      value: job.value,
      description: job.description,
      category: job.category,
      type: job.type,
      tags: job.tags,
      days: job.days
    });
  }

  toggleJobStatus = (id: string) => {
    return this.http.post(`/api/v1/jobs/${id}/status`, null);
  }
}
