import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transfer} from '../modules/transfer/models/transfer.model';
import {DayTransfers} from '../modules/statistics/models/dayTransfers.model';
import {SingleValue} from '../modules/transfer/models/singleValue.model';
import {GetTransfersRequest} from '../modules/transfer/models/getTransfersRequest.model';
import {IsMorePagedCollection} from '../modules/transfer/models/isMorePagedCollection.model';
import {TransfersListModel} from '../modules/transfer/models/transfersList.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  addTransfer(transfer: Transfer): Observable<string>{
    return this.http.post<string>(`/api/transfers`, {
      name: transfer.name,
      value: transfer.value,
      description: transfer.description,
      date: transfer.date,
      category: transfer.category,
      type: transfer.type,
      tags: transfer.tags
    });
  }

  updateTransfer(transfer: Transfer): Observable<string>{
    return this.http.put<string>(`/api/transfers`, {
      id: transfer.id,
      name: transfer.name,
      value: transfer.value,
      description: transfer.description,
      date: transfer.date,
      category: transfer.category,
      type: transfer.type,
      tags: transfer.tags
    });
  }

  deleteTransfer = (id: string) => {
    return this.http.delete(`/api/transfers/${id}`);
  }

  getTransfer(id: string): Observable<Transfer> {
    return this.http.get<Transfer>(`/api/transfers/${id}`);
  }

  getUserTransfers(request: GetTransfersRequest): Observable<TransfersListModel> {
    let params = new HttpParams();
    params = params.append('page', request.page.toString());
    params = params.append('take', request.take.toString());
    if (request.startDate != null) { params = params.append('startDate', request.startDate?.toISOString().slice(0, 10)); }
    if (request.endDate != null) { params = params.append('endDate', request.endDate?.toISOString().slice(0, 10)); }
    request.categories?.forEach(sender => params = params.append('categories', sender));
    request.tags?.forEach(sender => params = params.append('tags', sender));

    return this.http.get<TransfersListModel>(`/api/transfers`, {params});
  }

  getUserCategories(): Observable<Array<SingleValue<string>>> {
    return this.http.get<Array<SingleValue<string>>>(`/api/transfers/categories`);
  }

  getUserTags(): Observable<Array<SingleValue<string>>> {
    return this.http.get<Array<SingleValue<string>>>(`/api/transfers/tags`);
  }

}
