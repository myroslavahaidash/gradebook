import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { orderBy } from 'lodash';
import { NotificationsService } from 'angular2-notifications';
import {environment} from '../../../environments/environment';

@Injectable()
export class StudentsService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private notificationsService: NotificationsService) {
    this.students = new BehaviorSubject<any>([]);
    this.student = new BehaviorSubject<any>({});
  }

  private students: BehaviorSubject<any>;
  private student: BehaviorSubject<any>;
  private GROUPS_URL: string = environment.serverUrl + '/groups';
  private STUDENTS_URL: string = environment.serverUrl + '/students';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getStudents(groupId) {
    this.http.get(`${this.GROUPS_URL}/${groupId}/students`, this.getHeaders())
      .subscribe(
        students => this.students.next(orderBy(students, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc'])),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.students.asObservable();
  }

  getStudent(studentId) {
    this.http.get(`${this.STUDENTS_URL}/${studentId}`, this.getHeaders())
      .subscribe(
        student => this.student.next(student),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.student.asObservable();
  }

  createStudent(groupId, email, firstName, lastName, middleName) {
    this.http.put(this.STUDENTS_URL, {groupId, email, firstName, lastName, middleName}, this.getHeaders())
      .subscribe(
        student => {
          this.students.value.push(student);
          this.students.next(orderBy(this.students.value, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc']));
        },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  updateStudent(id, firstName, lastName, middleName) {
    this.http.post(`${this.STUDENTS_URL}/${id}`, {firstName, lastName, middleName}, this.getHeaders())
      .subscribe(
        () => {
          const student = this.students.value.find(t => t.id === id);
          student.firstName = firstName;
          student.lastName = lastName;
          student.middleName = middleName;
          this.students.next(this.students.value);
        },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка')
      );
  }

  deleteStudent(id) {
    this.http.delete(`${this.STUDENTS_URL}/${id}`, this.getHeaders())
      .subscribe(
        () => this.students.next(this.students.value.filter(t => t.id !== id)),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }
}

