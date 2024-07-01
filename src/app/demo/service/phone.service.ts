import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Phone} from '../api/phone.model';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class PhoneService {

  constructor(private http: HttpClient) { }

  getPhones(): Observable<Phone[]> {
    return this.http.get<Phone[]>(environment.apiUrl+'/read-csv');
  }
}
