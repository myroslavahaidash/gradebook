import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { orderBy } from 'lodash';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

@Injectable()
export class SpecialitiesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.specialities = new BehaviorSubject<any>([]);
  }

  private specialities: BehaviorSubject<any>;
  private SPECIALITIES_URL: string = environment.serverUrl + '/specialities';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getSpecialities () {
    this.http.get(this.SPECIALITIES_URL, this.getHeaders())
      .subscribe(
        specialities => this.specialities.next(orderBy(specialities, 'name', 'asc')),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.specialities.asObservable();
  }

  createSpeciality(code, name) {
    this.http.put(this.SPECIALITIES_URL, {code, name}, this.getHeaders())
      .subscribe(
        speciality => {
        this.specialities.value.push(speciality);
        this.specialities.next(orderBy(this.specialities.value, 'name', 'asc'));
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  updateSpeciality(id, code, name) {
    this.http.post(`${this.SPECIALITIES_URL}/${id}`, {code, name}, this.getHeaders()).subscribe(
      () => {
       const speciality = this.specialities.value.find(s => s.id === id);
       speciality.code = code;
       speciality.name = name;

       this.specialities.next(this.specialities.value);
      },
      err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  deleteSpeciality(id) {
    this.http.delete(`${this.SPECIALITIES_URL}/${id}`, this.getHeaders())
      .subscribe(
        () => this.specialities.next(this.specialities.value.filter(s => s.id !== id)),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }
}
