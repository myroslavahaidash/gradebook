import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class GradesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
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

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getGrades(studentId, courseId) {
    this.http.get(`http://localhost:8090/api/students/${studentId}/courses/${courseId}/grades`, this.getHeaders())
      .subscribe(grades => this.grades.next(grades));

    return this.grades.asObservable();
  }

  createGrade(studentId, courseId, value, description, createdAt) {
    this.http.put(`http://localhost:8090/api/students/${studentId}/courses/${courseId}/grades`,
      {value, description, createdAt}, this.getHeaders())
      .subscribe(grade => {
        this.grades.value.currentGrades.push(grade);
        this.grades.next(this.grades.value);
    });
  }

  deleteGrade(studentId, courseId, gradeId) {
    this.http.delete(`http://localhost:8090/api/students/${studentId}/courses/${courseId}/grades/${gradeId}`, this.getHeaders())
      .subscribe(() => {
        this.grades.value.currentGrades = this.grades.value.currentGrades.filter(g => g.id !== gradeId);
        this.grades.next(this.grades.value);
      });
  }

  getFinalGrade(studentId, courseId) {
    this.http.get(`http://localhost:8090/api/students/${studentId}/courses/${courseId}/grades/final`, this.getHeaders())
      .subscribe(finalGrade => this.finalGrade.next(finalGrade));

    return this.finalGrade.asObservable();
  }

  createFinalGrade(studentId, courseId) {
    this.http.put(`http://localhost:8090/api/students/${studentId}/courses/${courseId}/grades/final`, null, this.getHeaders())
      .subscribe(finalGrade => this.finalGrade.next(finalGrade));

    return this.finalGrade.asObservable();
  }

  getStudentGrades(courseId) {
    this.http.get(`http://localhost:8090/api/students/self/courses/${courseId}/grades`, this.getHeaders())
      .subscribe(studentGrades => this.studentGrades.next(studentGrades));

    return this.studentGrades.asObservable();
  }

  getStudentFinalGrades() {
    this.http.get('http://localhost:8090/api/students/self/grades', this.getHeaders())
      .subscribe(finalGrades => this.studentFinalGrades.next(finalGrades));

    return this.studentFinalGrades;
  }
}
