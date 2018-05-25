import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class GroupScheduleService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.semesters = new BehaviorSubject<any>([]);
    this.subjects = new BehaviorSubject<any>([]);
    this.assessmentTypes = new BehaviorSubject<any>([]);
  }

  private semesters: BehaviorSubject<any>;
  private subjects: BehaviorSubject<any>;
  private assessmentTypes: BehaviorSubject<any>;

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getAssessmentTypes() {
    this.http.get('http://localhost:8090/api/assessment-types', this.getHeaders())
      .subscribe(assessmentTypes => {
        this.assessmentTypes.next(assessmentTypes);
      });

    return this.assessmentTypes.asObservable();
  }

  getGroupSemesters (groupId) {
    this.http.get(`http://localhost:8090/api/groups/${groupId}/semesters`, this.getHeaders())
      .subscribe((semesters: any[]) => {
        semesters.forEach(semester => {
          const year = new Date(semester.startsAt).getFullYear();
          semester.year = semester.semesterNumber === 2 ? year - 1 : year;
        });
        this.semesters.next(semesters);
      });

    return this.semesters.asObservable();
  }

  getGroupSemesterSubjects (groupId, year, semester) {
    this.http.get(`http://localhost:8090/api/groups/${groupId}/semesters/${year}/${semester}/courses`, this.getHeaders())
      .subscribe(subjects => {
        this.subjects.next(subjects);
      });

    return this.subjects.asObservable();
  }

  addGroupSemesterSubject(groupId, year, semester, subject, assessmentType) {
    this.http.put(`http://localhost:8090/api/groups/${groupId}/semesters/${year}/${semester}/courses`,
      {subjectId: subject.id, assessmentTypeId: assessmentType.id}, this.getHeaders())
      .subscribe(() => {
        this.subjects.value.push({subject, assessmentType, teachers: []});
        this.subjects.next(this.subjects.value);
      });
  }

  deleteGroupSemesterSubject(groupId, year, semester, courseId) {
    this.http.delete(`http://localhost:8090/api/groups/${groupId}/semesters/${year}/${semester}/courses/${courseId}`, this.getHeaders())
      .subscribe(() => this.subjects.next(this.subjects.value.filter(s => s.subject.id !== courseId)));
  }

  addTeacherToSubject(groupId, year, semester, course, teacher) {
    this.http.put(`http://localhost:8090/api/groups/${groupId}/semesters/${year}/${semester}/courses/${course.id}/teachers`,
      {teacherId: teacher.id},
      this.getHeaders())
      .subscribe(() => {
        const editedSubject = this.subjects.value.find(subject => subject.subject.id === course.id);
        console.log(teacher);
        editedSubject.teachers.push(teacher);
        this.subjects.next(this.subjects.value);
      });
  }

  deleteTeacherFromSubject(groupId, year, semester, courseId, teacherId) {
    this.http.delete(`http://localhost:8090/api/groups/${groupId}/semesters/${year}/${semester}/courses/${courseId}/teachers/${teacherId}`,
      this.getHeaders())
      .subscribe(() => {
          const editedSubject = this.subjects.value.find(subject => subject.subject.id === courseId);
          editedSubject.teachers = editedSubject.teachers.filter(t => t.id !== teacherId);
          this.subjects.next(this.subjects.value);
        }
      );
  }
}
