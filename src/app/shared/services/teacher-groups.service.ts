import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications';
import {environment} from '../../../environments/environment';

@Injectable()
export class TeacherGroupsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.groups = new BehaviorSubject<any>([]);
  }

  private groups: BehaviorSubject<any>;
  private GROUPS_URL: string = environment.serverUrl + '/teachers/self/semesters/current/groups';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getTeacherGroups() {
    this.http.get(this.GROUPS_URL, this.getHeaders())
      .subscribe(
        groups => this.groups.next(groups),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.groups.asObservable();
  }
}
