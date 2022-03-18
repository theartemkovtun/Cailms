import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStatistics} from '../modules/statistics/models/userStatistics.model';
import {Observable} from 'rxjs';
import {PeriodIncomeOutcome} from '../modules/statistics/models/periodIncomeOutcome.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getUserStatistics(month: number, year: number): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(`/api/v1/statistics?month=${month}&year=${year}`);
  }

  getUserPeriodStatistics(month: number, year: number): Observable<Array<PeriodIncomeOutcome>> {
    return this.http.get<Array<PeriodIncomeOutcome>>(`/api/v1/statistics/period?month=${month}&year=${year}`);
  }
}


