import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from '../api/product';
import {Phone} from '../api/phone.model';
import {Observable} from "rxjs";

@Injectable()
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/read-csv';

  constructor(private http: HttpClient) { }

  getPhones(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiUrl);
  }

  getProductsSmall() {
    return this.http.get<any>('assets/demo/data/products-small.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProducts() {
    return this.http.get<any>('assets/demo/data/products.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProductsWithOrdersSmall() {
    return this.http.get<any>('assets/demo/data/products-orders-small.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }
}
