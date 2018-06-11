import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { Grade } from '../models/grade';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

@Injectable()
export class GradesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.grades = new BehaviorSubject<any>({});
    this.studentGrades = new BehaviorSubject<any>({});
    this.studentFinalGrades = new BehaviorSubject<any>([]);
    this.finalGrade = new BehaviorSubject<any>({});
  }

  private grades: BehaviorSubject<any>;
  private finalGrade: BehaviorSubject<any>;
  private studentGrades: BehaviorSubject<any>;
  private studentFinalGrades: BehaviorSubject<any>;
  private STUDENTS_URL: string = environment.serverUrl + '/students';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getGrades(studentId, courseId) {
    this.http.get(`${this.STUDENTS_URL}/${studentId}/courses/${courseId}/grades`, this.getHeaders())
      .subscribe(
        grades => this.grades.next(grades),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.grades.asObservable();
  }

  createGrade(studentId, courseId, value, description, createdAt) {
    this.http.put(`${this.STUDENTS_URL}/${studentId}/courses/${courseId}/grades`,
      {value, description, createdAt}, this.getHeaders())
      .subscribe((grade: Grade) => {
        this.grades.value.currentGrades.push(grade);
        this.grades.value.currentGradesTotal += grade.value;
        this.grades.next(this.grades.value);
    },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  deleteGrade(studentId, courseId, gradeId) {
    this.http.delete(`${this.STUDENTS_URL}/${studentId}/courses/${courseId}/grades/${gradeId}`, this.getHeaders())
      .subscribe(() => {
        this.grades.value.currentGradesTotal -= this.grades.value.currentGrades.find(g => g.id === gradeId).value;
        this.grades.value.currentGrades = this.grades.value.currentGrades.filter(g => g.id !== gradeId);
        this.grades.next(this.grades.value);
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  getFinalGrade(studentId, courseId) {
    this.http.get(`${this.STUDENTS_URL}/${studentId}/courses/${courseId}/grades/final`, this.getHeaders())
      .subscribe(
        finalGrade => this.finalGrade.next(finalGrade),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.finalGrade.asObservable();
  }

  createFinalGrade(studentId, courseId) {
    this.http.put(`${this.STUDENTS_URL}/${studentId}/courses/${courseId}/grades/final`, null, this.getHeaders())
      .subscribe(
        finalGrade => this.finalGrade.next(finalGrade),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.finalGrade.asObservable();
  }

  getStudentGrades(courseId) {
    this.http.get(`${this.STUDENTS_URL}/self/courses/${courseId}/grades`, this.getHeaders())
      .subscribe(
        studentGrades => this.studentGrades.next(studentGrades),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.studentGrades.asObservable();
  }

  getStudentFinalGrades() {
    this.http.get(`${this.STUDENTS_URL}/self/grades`, this.getHeaders())
      .subscribe(
        finalGrades => this.studentFinalGrades.next(finalGrades),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.studentFinalGrades;
  }
}
