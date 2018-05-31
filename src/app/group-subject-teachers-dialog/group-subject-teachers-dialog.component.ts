import { Component, OnInit, Inject } from '@angular/core';
import { GroupScheduleService } from '../group-schedule.service';
import { TeachersService } from '../teachers.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { xorWith, isEqual } from 'lodash';

@Component({
  selector: 'app-group-subject-teachers-dialog',
  templateUrl: './group-subject-teachers-dialog.component.html',
  styleUrls: ['./group-subject-teachers-dialog.component.scss']
})
export class GroupSubjectTeachersDialogComponent implements OnInit {

  constructor(
    private groupScheduleService: GroupScheduleService,
    private teachersService: TeachersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  teachers;
  selectedTeacher;

  onSubmit() {
    this.groupScheduleService
      .addTeacherToSubject(this.data.groupId, this.data.year, this.data.semester, this.data.subject.subject, this.selectedTeacher);

    this.teachers = this.teachers.filter(t => !isEqual(t, this.selectedTeacher));
    this.selectedTeacher = null;
  }

  onDelete(teacher) {
    this.groupScheduleService
      .deleteTeacherFromSubject(this.data.groupId, this.data.year, this.data.semester, this.data.subject.subject.id, teacher.id);
  }

  ngOnInit() {
    this.teachersService.getTeachers().subscribe(teachers => {
      this.teachers = xorWith(teachers, this.data.subject.teachers, isEqual);
    });
  }

}
