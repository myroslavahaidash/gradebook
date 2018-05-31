import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../shared/services/groups.service';
import { SubjectsService } from '../../shared/services/subjects.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private subjectsService: SubjectsService
  ) { }

  students = [];
  subjectId;
  subject;
  groupId;
  group;

  ngOnInit() {
    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.groupsService.getGroupStudents(this.groupId);
      }).subscribe(groupStudents => {
      this.students = groupStudents;
    });

    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.groupsService.getGroup(this.groupId);
      }).subscribe(group => {
      this.group = group;
    });

    this.route.params.switchMap(
      params => {
        this.subjectId = +params.subjectid;
        return this.subjectsService.getSubject(this.subjectId);
      }).subscribe(subject => {
      this.subject = subject;
    });
  }

}
