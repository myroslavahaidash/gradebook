import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class SpecialitiesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.specialities = new BehaviorSubject<any>([]);
  }

  private specialities: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getSpecialities () {
    this.http.get('http://localhost:8090/api/specialities', this.getHeaders())
      .subscribe(specialities => this.specialities.next(specialities));

    return this.specialities.asObservable();
  }

  createSpeciality(code, name) {
    this.http.put('http://localhost:8090/api/specialities', {code, name}, this.getHeaders())
      .subscribe(speciality => {
        this.specialities.value.push(speciality);
        this.specialities.next(this.specialities.value);
      });
  }

  updateSpeciality(id, code, name) {
    this.http.post(`http://localhost:8090/api/specialities/${id}`, {code, name}, this.getHeaders()).subscribe(
      () => {
       const speciality = this.specialities.value.find(s => s.id === id);
       speciality.code = code;
       speciality.name = name;

       this.specialities.next(this.specialities.value);
      }
    );
  }

  deleteSpeciality(id) {
    this.http.delete(`http://localhost:8090/api/specialities/${id}`, this.getHeaders())
      .subscribe(() => this.specialities.next(this.specialities.value.filter(s => s.id !== id)));
  }
}
