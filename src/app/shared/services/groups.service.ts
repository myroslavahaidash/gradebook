import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { orderBy } from 'lodash';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

@Injectable()
export class GroupsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.groups = new BehaviorSubject<any>([]);
    this.group = new BehaviorSubject<any>({});
    this.groupStudents = new BehaviorSubject<any>([]);
  }

  private groups: BehaviorSubject<any>;
  private group: BehaviorSubject<any>;
  private groupStudents: BehaviorSubject<any>;
  private GROUPS_URL: string = environment.serverUrl + '/groups';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getGroups() {
    this.http.get(this.GROUPS_URL, this.getHeaders())
      .subscribe(
        groups => this.groups.next(orderBy(groups, 'code', 'asc')),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.groups.asObservable();
  }

  getGroup(id) {
    this.http.get(`${this.GROUPS_URL}/${id}`, this.getHeaders())
      .subscribe(
        group => this.group.next(group),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.group.asObservable();
  }

  getGroupStudents(groupId) {
    this.http.get(`${this.GROUPS_URL}/${groupId}/students`, this.getHeaders())
      .subscribe(
        groupStudents => this.groupStudents.next(orderBy(groupStudents, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc'])),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.groupStudents.asObservable();
  }

  createGroup(code, educationStartedAt, specialityId) {
    this.http.put(this.GROUPS_URL, {code, educationStartedAt, specialityId}, this.getHeaders())
      .subscribe(
        group => {
        this.groups.value.push(group);
        this.groups.next(orderBy(this.groups.value, 'code', 'asc'));
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  updateGroup(groupId, code, speciality) {
    this.http.post(`${this.GROUPS_URL}/${groupId}`, {code, specialityId: speciality.id}, this.getHeaders())
      .subscribe(
        () => {
        const group = this.groups.value.find(g => g.id === groupId);

        group.code = code;
        group.speciality = speciality;

        this.groups.next(this.groups.value);
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  deleteGroup(groupId) {
    this.http.delete(`${this.GROUPS_URL}/${groupId}`, this.getHeaders())
      .subscribe(
        () => this.groups.next(this.groups.value.filter(g => g.id !== groupId)),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }
}
