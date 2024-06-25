import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PriminiPhone} from "../api/priminiphone.model";

@Injectable()
export class PriminiPhoneService {
  private apiUrl = 'https://backend-recommandation.onrender.com/api/v1/read-primini';

  constructor(private http: HttpClient) { }

  getPhones(start: number): Observable<PriminiPhone[]> {
    const body = { start }; // Create the request body
    return this.http.post<PriminiPhone[]>(this.apiUrl, body); // Send a POST request with the body
  }
}
