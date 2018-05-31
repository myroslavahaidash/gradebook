import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class SubjectsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.subjects = new BehaviorSubject<any>([]);
    this.subject = new BehaviorSubject<any>({});
    this.studentCurrentSubjects = new BehaviorSubject<any>([]);
  }

  private subjects: BehaviorSubject<any>;
  private subject: BehaviorSubject<any>;
  private studentCurrentSubjects: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getSubjects () {
    this.http.get('http://localhost:8090/api/subjects', this.getHeaders())
      .subscribe(subjects => this.subjects.next(subjects));

    return this.subjects.asObservable();
  }

  getSubject (id) {
    this.http.get(`http://localhost:8090/api/subjects/${id}`, this.getHeaders())
      .subscribe(subject => this.subject.next(subject));

    return this.subject.asObservable();
  }

  createSubject(name) {
    this.http.put('http://localhost:8090/api/subjects', {name}, this.getHeaders())
      .subscribe(subject => {
        this.subjects.value.push(subject);
        this.subjects.next(this.subjects.value);
      });
  }

  updateSubject(id, name) {
    this.http.post(`http://localhost:8090/api/subjects/${id}`, {name}, this.getHeaders()).subscribe(
      () => {
        const subject = this.subjects.value.find(s => s.id === id);
        subject.name = name;

        this.subjects.next(this.subjects.value);
      }
    );
  }

  deleteSubject(id) {
    this.http.delete(`http://localhost:8090/api/subjects/${id}`, this.getHeaders())
      .subscribe(() => this.subjects.next(this.subjects.value.filter(s => s.id !== id)));
  }

  getStudentCurrentSubjects() {
    this.http.get('http://localhost:8090/api/students/self/group/semesters/current/courses', this.getHeaders())
      .subscribe(subjects => this.studentCurrentSubjects.next(subjects));

    return this.studentCurrentSubjects.asObservable();
  }
}
