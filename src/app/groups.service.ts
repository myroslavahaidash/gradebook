import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class GroupsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.groups = new BehaviorSubject<any>([]);
    this.group = new BehaviorSubject<any>({});
    this.groupStudents = new BehaviorSubject<any>([]);
  }

  private groups: BehaviorSubject<any>;
  private group: BehaviorSubject<any>;
  private groupStudents: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getGroups() {
    this.http.get('http://localhost:8090/api/groups', this.getHeaders())
      .subscribe(groups => this.groups.next(groups));

    return this.groups.asObservable();
  }

  getGroup(id) {
    this.http.get(`http://localhost:8090/api/groups/${id}`, this.getHeaders())
      .subscribe(group => this.group.next(group));

    return this.group.asObservable();
  }

  getGroupStudents(groupId) {
    this.http.get(`http://localhost:8090/api/groups/${groupId}/students`, this.getHeaders())
      .subscribe(groupStudents => this.groupStudents.next(groupStudents));

    return this.groupStudents.asObservable();
  }

  createGroup(code, educationStartedAt, specialityId) {
    this.http.put('http://localhost:8090/api/groups', {code, educationStartedAt, specialityId}, this.getHeaders())
      .subscribe(group => {
        this.groups.value.push(group);
        this.groups.next(this.groups.value);
      });
  }

  updateGroup(groupId, code, speciality) {
    this.http.post(`http://localhost:8090/api/groups/${groupId}`, {code, specialityId: speciality.id}, this.getHeaders())
      .subscribe(() => {
        const group = this.groups.value.find(g => g.id === groupId);

        group.code = code;
        group.speciality = speciality;

        this.groups.next(this.groups.value);
      }
    );
  }

  deleteGroup(groupId) {
    this.http.delete(`http://localhost:8090/api/groups/${groupId}`, this.getHeaders())
      .subscribe(() => this.groups.next(this.groups.value.filter(g => g.id !== groupId)));
  }
}
