import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { orderBy } from 'lodash';

@Injectable()
export class TeachersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.teachers = new BehaviorSubject<any>([]);
  }

  private teachers: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getTeachers () {
    this.http.get('http://localhost:8090/api/teachers', this.getHeaders())
      .subscribe(teachers => this.teachers.next(orderBy(teachers, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc'])));

    return this.teachers.asObservable();
  }

  createTeacher(email, firstName, lastName, middleName) {
    this.http.put('http://localhost:8090/api/teachers', {email, firstName, lastName, middleName}, this.getHeaders())
      .subscribe(teacher => {
        this.teachers.value.push(teacher);
        this.teachers.next(orderBy(this.teachers.value, ['lastName', 'firstName', 'middleName'], ['asc', 'asc', 'asc']));
      });
  }

  updateTeacher(id, firstName, lastName, middleName) {
    this.http.post(`http://localhost:8090/api/teachers/${id}`, {firstName, lastName, middleName}, this.getHeaders())
      .subscribe(() => {
        const teacher = this.teachers.value.find(t => t.id === id);
        teacher.firstName = firstName;
        teacher.lastName = lastName;
        teacher.middleName = middleName;

        this.teachers.next(this.teachers.value);
      }
    );
  }

  deleteTeacher(id) {
    this.http.delete(`http://localhost:8090/api/teachers/${id}`, this.getHeaders())
      .subscribe(() => this.teachers.next(this.teachers.value.filter(t => t.id !== id)));
  }
}
