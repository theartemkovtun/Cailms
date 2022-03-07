import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transfer} from '../modules/transfer/models/transfer.model';
import {SingleValue} from '../modules/transfer/models/singleValue.model';
import {GetTransfersRequest} from '../modules/transfer/models/getTransfersRequest.model';
import {TransfersListModel} from '../modules/transfer/models/transfersList.model';
import {AddSavedTransfersFilterRequest} from '../modules/transfer/models/addSavedTransfersFilterRequest.model';
import {SavedTransfersFilter} from '../modules/transfer/models/savedTransfersFilter.model';
import {AddTransferTemplateRequest} from '../modules/transfer/models/addTransferTemplateRequest.model';
import {TransferTemplate} from '../modules/transfer/models/transferTemplate.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  private static yyyymmddDate(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [date.getFullYear(), '-', (month > 9 ? '' : '0') + month, '-', (day > 9 ? '' : '0') + day].join('');
  }


  addTransfer(transfer: Transfer): Observable<string>{
    return this.http.post<string>(`/api/transfers`, {
      name: transfer.name,
      value: transfer.value,
      description: transfer.description,
      date: TransferService.yyyymmddDate(transfer.date),
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
      date: TransferService.yyyymmddDate(transfer.date),
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
    if (request.type != null) { params = params.append('type', request.type.toString()); }
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

  addSavedTransfersFilter = (request: AddSavedTransfersFilterRequest) => {
    return this.http.post(`/api/transfers/savedFilters`, {
      name: request.name,
      startDate:  request.startDate != null ? TransferService.yyyymmddDate(request.startDate) : null,
      endDate:  request.endDate != null ? TransferService.yyyymmddDate(request.endDate) : null,
      categories: request.categories,
      type: request.type,
      tags: request.tags
    });
  }

  getUserSavedTransferFilters(): Observable<Array<SavedTransfersFilter>> {
    return this.http.get<Array<SavedTransfersFilter>>(`/api/transfers/savedFilters`);
  }

  renameSavedTransfersFilter = (id: string, name: string) => {
    return this.http.put('/api/transfers/savedFilters', { id, name });
  }

  deleteSavedTransfersFilter = (id: string) => {
    return this.http.delete(`/api/transfers/savedFilters/${id}`);
  }

  addTransfersTemplate = (request: AddTransferTemplateRequest) => {
    return this.http.post(`/api/transfers/templates`, {
      name: request.name,
      templateName: request.templateName,
      description: request.description,
      value: request.value,
      category: request.category,
      type: request.type,
      tags: request.tags
    });
  }

  getUserTransfersTemplates(): Observable<Array<TransferTemplate>> {
    return this.http.get<Array<TransferTemplate>>(`/api/transfers/templates`);
  }

  renameTransfersTemplate = (id: string, name: string) => {
    return this.http.put('/api/transfers/templates', { id, name });
  }

  deleteTransfersTemplate = (id: string) => {
    return this.http.delete(`/api/transfers/templates/${id}`);
  }

}
