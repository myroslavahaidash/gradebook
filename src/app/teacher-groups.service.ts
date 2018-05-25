import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TeacherGroupsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.groups = new BehaviorSubject<any>([]);
  }

  private groups: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getTeacherGroups() {
    this.http.get('http://localhost:8090/api/teachers/self/semesters/current/groups', this.getHeaders())
      .subscribe(groups => this.groups.next(groups));

    return this.groups.asObservable();
  }
}
