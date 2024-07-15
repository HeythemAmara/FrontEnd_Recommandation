import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../api/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${environment.apiUrlMongo}/auth/users`, { headers });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password }; // Create the request body
    return this.http.post<any>(`${environment.apiUrlMongo}/auth/login`, body);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const role = 'New';
    const body = { username, email, password, role }; // Create the request body
    return this.http.post<any>(`${environment.apiUrlMongo}/auth/register`, body);
  }

  changeRole(username: string, newRole: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { username, newRole };
    return this.http.post<any>(`${environment.apiUrlMongo}/auth/change-role`, body, { headers });
  }

  deleteUser(username: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { username };
    return this.http.request<any>('delete', `${environment.apiUrlMongo}/auth/delete-user`, { headers, body });
  }

  deleteUsers(usernames: string[]): Observable<any> {
    const headers = this.getHeaders();
    const body = { usernames };
    return this.http.request<any>('delete', `${environment.apiUrlMongo}/auth/delete-users`, { headers, body });
  }

  changePassword(username: string, newPassword: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { username, newPassword };
    return this.http.post<any>(`${environment.apiUrlMongo}/auth/change-password`, body, { headers });
  }
}
