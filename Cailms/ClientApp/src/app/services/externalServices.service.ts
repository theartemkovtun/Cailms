import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrencyExchangeModel} from '../modules/transfer/models/currencyExchange.model';
import {CurrencyExchangeResponse} from '../modules/transfer/models/currencyExchangeResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ExternalServicesService {

  constructor(private http: HttpClient) { }

  getCurrencyRates(request: CurrencyExchangeModel): Observable<CurrencyExchangeResponse>{
    let params = new HttpParams();
    params = params.append('from', request.from.toString());
    params = params.append('to', request.to.toString());
    params = params.append('amount', request.value.toString());
    params = params.append('date', request.date.toISOString().slice(0, 10));
    return this.http.get<CurrencyExchangeResponse>(`/api/externalServices/currencyExchange`, {params});
  }

}
