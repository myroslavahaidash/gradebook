import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class StudentsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.students = new BehaviorSubject<any>([]);
  }

  private students: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getStudents (groupId) {
    this.http.get(`http://localhost:8090/api/groups/${groupId}/students`, this.getHeaders())
      .subscribe(students => this.students.next(students));

    return this.students.asObservable();
  }

  createStudent(groupId, email, firstName, lastName, middleName) {
    this.http.put('http://localhost:8090/api/students', {groupId, email, firstName, lastName, middleName}, this.getHeaders())
      .subscribe(student => {
        this.students.value.push(student);
        this.students.next(this.students.value);
      });
  }

  updateStudent(id, firstName, lastName, middleName) {
    this.http.post(`http://localhost:8090/api/students/${id}`, {firstName, lastName, middleName}, this.getHeaders())
      .subscribe(() => {
          const student = this.students.value.find(t => t.id === id);
          student.firstName = firstName;
          student.lastName = lastName;
          student.middleName = middleName;

          this.students.next(this.students.value);
        }
      );
  }

  deleteStudent(id) {
    this.http.delete(`http://localhost:8090/api/students/${id}`, this.getHeaders())
      .subscribe(() => this.students.next(this.students.value.filter(t => t.id !== id)));
  }
}

