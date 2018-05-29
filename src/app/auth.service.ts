import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as decode from 'jwt-decode';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject} from 'rxjs';
import AuthToken from './models/AuthToken';

@Injectable()
export class AuthService {

  token;
  userProfile: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');

    let userProfile = null;

    if (this.token) {
      userProfile = this.getUserProfileFromToken(this.token);
    }

    this.userProfile = new BehaviorSubject<any>(userProfile);
  }

  private getUserProfileFromToken(token) {
    const tokenPayload = decode(token);

    return {
      firstName: tokenPayload.FirstName,
      lastName: tokenPayload.LastName,
      middleName: tokenPayload.MiddleName,
      role: tokenPayload.Role,
      email: tokenPayload.Email
    };
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
  }

  login(login, password) {
    return this.http.post('http://localhost:8090/api/auth', {login, password})
      .pipe(
        switchMap((data: AuthToken) => {
          localStorage.setItem('token', data.token);
          this.token = data.token;

          const userProfile = this.getUserProfileFromToken(this.token);

          this.userProfile.next(userProfile);

          return of(userProfile);
        }),
        catchError(err => of(null))
      );
  }

  logout() {
    this.token = null;
    this.userProfile.next(null);
    localStorage.removeItem('token');
  }

  getUserProfile() {
    return this.userProfile.asObservable();
  }

  getToken() {
    return this.token;
  }

  changePassword(oldPassword, newPassword) {
    console.log(oldPassword, newPassword);
    this.http.post('http://localhost:8090/api/auth/change-password', {oldPassword, newPassword}, this.getHeaders())
      .subscribe(() => {});
  }

  resetPassword(email) {
    this.http.post('http://localhost:8090/api/auth/reset-password', {email}).subscribe(() => console.log(email));
  }
}
