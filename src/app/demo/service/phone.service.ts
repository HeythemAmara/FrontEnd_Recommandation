import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Phone} from '../api/phone.model';
import {Observable} from "rxjs";

@Injectable()
export class PhoneService {
  private apiUrl = 'https://backend-recommandation.onrender.com/api/v1/read-csv';

  constructor(private http: HttpClient) { }

  getPhones(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiUrl);
  }
}
