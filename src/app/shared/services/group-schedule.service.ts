import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

@Injectable()
export class GroupScheduleService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.semesters = new BehaviorSubject<any>([]);
    this.subjects = new BehaviorSubject<any>([]);
    this.assessmentTypes = new BehaviorSubject<any>([]);
  }

  private semesters: BehaviorSubject<any>;
  private subjects: BehaviorSubject<any>;
  private assessmentTypes: BehaviorSubject<any>;
  private ASSESSMENT_TYPES_URL: string = environment.serverUrl + '/assessment-types';
  private GROUPS_URL: string = environment.serverUrl + '/groups';

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getAssessmentTypes() {
    this.http.get(this.ASSESSMENT_TYPES_URL, this.getHeaders())
      .subscribe(
        assessmentTypes => this.assessmentTypes.next(assessmentTypes),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.assessmentTypes.asObservable();
  }

  getGroupSemesters (groupId) {
    this.http.get(`${this.GROUPS_URL}/${groupId}/semesters`, this.getHeaders())
      .subscribe(
        (semesters: any[]) => {
        semesters.forEach(semester => {
          const year = new Date(semester.startsAt).getFullYear();
          semester.year = semester.semesterNumber === 2 ? year - 1 : year;
          semester.isCurrent = new Date(semester.startsAt) <= new Date() && new Date(semester.endsAt) >= new Date();
        });
        this.semesters.next(semesters);
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.semesters.asObservable();
  }

  getGroupSemesterSubjects (groupId, year, semester) {
    this.http.get(`${this.GROUPS_URL}/${groupId}/semesters/${year}/${semester}/courses`, this.getHeaders())
      .subscribe(
        subjects => this.subjects.next(subjects),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));

    return this.subjects.asObservable();
  }

  addGroupSemesterSubject(groupId, year, semester, subject, assessmentType) {
    this.http.put(`${this.GROUPS_URL}/${groupId}/semesters/${year}/${semester}/courses`,
      {subjectId: subject.id, assessmentTypeId: assessmentType.id}, this.getHeaders())
      .subscribe(
        () => {
        this.subjects.value.push({subject, assessmentType, teachers: []});
        this.subjects.next(this.subjects.value);
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  deleteGroupSemesterSubject(groupId, year, semester, courseId) {
    this.http.delete(`${this.GROUPS_URL}/${groupId}/semesters/${year}/${semester}/courses/${courseId}`, this.getHeaders())
      .subscribe(
        () => this.subjects.next(this.subjects.value.filter(s => s.subject.id !== courseId)),
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  addTeacherToSubject(groupId, year, semester, course, teacher) {
    this.http.put(`${this.GROUPS_URL}/${groupId}/semesters/${year}/${semester}/courses/${course.id}/teachers`,
      {teacherId: teacher.id},
      this.getHeaders())
      .subscribe(
        () => {
        const editedSubject = this.subjects.value.find(subject => subject.subject.id === course.id);
        editedSubject.teachers.push(teacher);
        this.subjects.next(this.subjects.value);
      },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }

  deleteTeacherFromSubject(groupId, year, semester, courseId, teacherId) {
    this.http.delete(`${this.GROUPS_URL}/${groupId}/semesters/${year}/${semester}/courses/${courseId}/teachers/${teacherId}`,
      this.getHeaders())
      .subscribe(
        () => {
          const editedSubject = this.subjects.value.find(subject => subject.subject.id === courseId);
          editedSubject.teachers = editedSubject.teachers.filter(t => t.id !== teacherId);
          this.subjects.next(this.subjects.value);
        },
        err => this.notificationsService.error((err.error && err.error.error) || 'Помилка'));
  }
}
