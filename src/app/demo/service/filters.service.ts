import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Filters} from '../api/filters.model';
import {Observable} from "rxjs";

@Injectable()
export class FilterService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) { }

  getFilters(): Observable<Filters> {
    return this.http.get<Filters>(this.apiUrl+'/filter-csv');
  }
  getFiltersPrimini(): Observable<Filters> {
    return this.http.get<Filters>(this.apiUrl+'/filter-primini-csv');
  }

  getFilteredData(filters: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/filter-update', filters);
  }

  getFilteredPriminiData(filters: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/filter-primini-update', filters);
  }

}
