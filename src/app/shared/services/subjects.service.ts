import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications';
import {environment} from '../../../environments/environment';

@Injectable()
export class SubjectsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.subjects = new BehaviorSubject<any>([]);
    this.subject = new BehaviorSubject<any>({});
    this.studentCurrentSubjects = new BehaviorSubject<any>([]);
  }

  private subjects: BehaviorSubject<any>;
  private subject: BehaviorSubject<any>;
  private studentCurrentSubjects: BehaviorSubject<any>;
  private SUBJECTS_URL: string = environment.serverUrl + '/subjects';
  private STUDENTS_URL: string = environment.serverUrl + '/students';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getSubjects () {
    this.http.get(this.SUBJECTS_URL, this.getHeaders())
      .subscribe(
        subjects => this.subjects.next(subjects),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.subjects.asObservable();
  }

  getSubject (id) {
    this.http.get(`${this.SUBJECTS_URL}/${id}`, this.getHeaders())
      .subscribe(
        subject => this.subject.next(subject),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.subject.asObservable();
  }

  createSubject(name) {
    this.http.put(this.SUBJECTS_URL, {name}, this.getHeaders())
      .subscribe(
        subject => {
          this.subjects.value.push(subject);
          this.subjects.next(this.subjects.value);
        },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  updateSubject(id, name) {
    this.http.post(`${this.SUBJECTS_URL}/${id}`, {name}, this.getHeaders()).subscribe(
      () => {
        const subject = this.subjects.value.find(s => s.id === id);
        subject.name = name;

        this.subjects.next(this.subjects.value);
      },
      err => this.notificationsService.error((err.error && err.error.error) || 'Помилка')
    );
  }

  deleteSubject(id) {
    this.http.delete(`${this.SUBJECTS_URL}/${id}`, this.getHeaders())
      .subscribe(
        () => this.subjects.next(this.subjects.value.filter(s => s.id !== id)),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  getStudentCurrentSubjects() {
    this.http.get(`${this.STUDENTS_URL}/self/group/semesters/current/courses`, this.getHeaders())
      .subscribe(
        subjects => this.studentCurrentSubjects.next(subjects),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.studentCurrentSubjects.asObservable();
  }
}
