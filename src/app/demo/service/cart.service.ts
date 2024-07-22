import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Cart} from "src/app/demo/api/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = `${environment.apiUrlMongo}/carts`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createCart(cart: Cart): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/create`, cart, { headers });
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

  changeCartStatus(reference: string, status: string): Observable<any> {
    const headers = this.getHeaders();
    let bodycart = {
      "reference": reference,
      "status": status
    };
    return this.http.put<any>(`${this.baseUrl}/change-status`, bodycart, { headers });
  }

  removeCart(reference: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { reference };
    return this.http.request<any>('delete', `${this.baseUrl}/remove-cart`, { headers, body });
  }

  deleteMultipleCarts(reference: string[]): Observable<any> {
    console.log(reference);
    let bodyref={"reference": reference}
    const headers = this.getHeaders();
    return this.http.request<any>('delete', `${this.baseUrl}/remove-carts`, { headers, body: bodyref});
  }
}
