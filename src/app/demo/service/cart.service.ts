import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createCart(createCartDto: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/create`, createCartDto, { headers });
  }

  getAllCarts(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/get-all`, { headers });
  }

  getCartsByEmployee(employee: string): Observable<any[]> {
    const headers = this.getHeaders();
    const body = { employee };
    return this.http.post<any[]>(`${this.baseUrl}/get-by-employee`, body, { headers });
  }

  getCartByReference(reference: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { reference };
    return this.http.post<any>(`${this.baseUrl}/get-by-reference`, body, { headers });
  }

  changeCartStatus(changeStatusDto: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/change-status`, changeStatusDto, { headers });
  }

  removeCart(reference: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { reference };
    return this.http.request<any>('delete', `${this.baseUrl}/remove-cart`, { headers, body });
  }

  deleteMultipleCarts(deleteCartsDto: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.request<any>('delete', `${this.baseUrl}/remove-carts`, { headers, body: deleteCartsDto });
  }
}
