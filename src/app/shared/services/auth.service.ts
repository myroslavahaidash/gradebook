import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as decode from 'jwt-decode';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject} from 'rxjs';
import AuthToken from '../models/auth-token';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  private token;
  private userProfile: BehaviorSubject<any>;
  private AUTH_URL: string = environment.serverUrl + '/auth';
  private CHANGE_PASSWORD_URL: string = environment.serverUrl + '/auth/change-password';
  private RESET_PASSWORD_URL: string = environment.serverUrl + '/auth/reset-password';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
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
    return this.http.post(this.AUTH_URL, {login, password})
      .pipe(
        switchMap((data: AuthToken) => {
          localStorage.setItem('token', data.token);
          this.token = data.token;

          const userProfile = this.getUserProfileFromToken(this.token);

          this.userProfile.next(userProfile);

          return of(userProfile);
        }),
        catchError(err => {
          this.notificationsService.error((err.error && err.error.error) || 'Помилка');
          return of(null);
        })
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
    this.http.post(this.CHANGE_PASSWORD_URL, {oldPassword, newPassword}, this.getHeaders())
      .subscribe(
        () => this.notificationsService.success('Пароль успішно змінено'),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  resetPassword(email) {
    this.http.post(this.RESET_PASSWORD_URL, {email}).subscribe(
      () => this.notificationsService.success('Новий пароль надіслано на вказану електронну пошту'),
      err => this.notificationsService.error((err.error && err.error.error) || 'Помилка')
      );
  }
}
