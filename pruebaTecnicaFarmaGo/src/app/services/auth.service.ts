import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, contra: string) {
    return this.http.post<string>('http://localhost:3000/auth/login', { email, contra });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
