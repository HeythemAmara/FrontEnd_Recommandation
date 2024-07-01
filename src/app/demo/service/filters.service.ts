import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Filters} from '../api/filters.model';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) { }

  getFilters(): Observable<Filters> {
    return this.http.get<Filters>(environment.apiUrl+'/filter-csv');
  }
  getFiltersPrimini(): Observable<Filters> {
    return this.http.get<Filters>(environment.apiUrl+'/filter-primini-csv');
  }

  getFilteredData(filters: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl+'/filter-update', filters);
  }

  getFilteredPriminiData(filters: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl+'/filter-primini-update', filters);
  }

}
