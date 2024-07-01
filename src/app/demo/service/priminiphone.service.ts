import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PriminiPhone} from "../api/priminiphone.model";
import { environment } from 'src/environments/environment';

@Injectable()
export class PriminiPhoneService {

  constructor(private http: HttpClient) { }

  getPhones(start: number): Observable<PriminiPhone[]> {
    const body = { start }; // Create the request body
    return this.http.post<PriminiPhone[]>(environment.apiUrl+'/read-primini', body); // Send a POST request with the body
  }
}
