import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { orderBy } from 'lodash';
import { NotificationsService } from 'angular2-notifications';
import {environment} from '../../../environments/environment';

@Injectable()
export class TeachersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.teachers = new BehaviorSubject<any>([]);
  }

  private teachers: BehaviorSubject<any>;
  private TEACHERS_URL: string = environment.serverUrl + '/teachers';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getTeachers () {
    this.http.get(this.TEACHERS_URL, this.getHeaders())
      .subscribe(
        teachers => this.teachers.next(orderBy(teachers, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc'])),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.teachers.asObservable();
  }

  createTeacher(email, firstName, lastName, middleName) {
    this.http.put(this.TEACHERS_URL, {email, firstName, lastName, middleName}, this.getHeaders())
      .subscribe(
        teacher => {
        this.teachers.value.push(teacher);
        this.teachers.next(orderBy(this.teachers.value, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc']));
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  updateTeacher(id, firstName, lastName, middleName) {
    this.http.post(`${this.TEACHERS_URL}/${id}`, {firstName, lastName, middleName}, this.getHeaders())
      .subscribe(
        () => {
        const teacher = this.teachers.value.find(t => t.id === id);
        teacher.firstName = firstName;
        teacher.lastName = lastName;
        teacher.middleName = middleName;

        this.teachers.next(this.teachers.value);
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка')
    );
  }

  deleteTeacher(id) {
    this.http.delete(`${this.TEACHERS_URL}/${id}`, this.getHeaders())
      .subscribe(
        () => this.teachers.next(this.teachers.value.filter(t => t.id !== id)),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }
}
