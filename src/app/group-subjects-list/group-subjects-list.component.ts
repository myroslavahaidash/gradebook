import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { GroupScheduleService } from '../group-schedule.service';
import { GroupSubjectDialogComponent } from '../group-subject-dialog/group-subject-dialog.component';
import { GroupSubjectTeachersDialogComponent } from '../group-subject-teachers-dialog/group-subject-teachers-dialog.component';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-group-subjects-list',
  templateUrl: './group-subjects-list.component.html',
  styleUrls: ['./group-subjects-list.component.scss']
})
export class GroupSubjectsListComponent implements OnInit {

  constructor(
    private groupScheduleService: GroupScheduleService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  displayedColumns = ['subject', 'assessmentType', 'teachers', 'delete'];
  dataSource;
  groupId;
  year;
  semester;
  subjects;

  openAddSubjectDialog() {
    const dialogRef = this.dialog.open(GroupSubjectDialogComponent, {
      width: '250px',
      data: {
        groupId: this.groupId,
        year: this.year,
        semester: this.semester
      }
    });
  }

  openGroupSubjectTeachersDialog(subject) {
    const dialogRef = this.dialog.open(GroupSubjectTeachersDialogComponent, {
      width: '350px',
      data: {
        subject,
        groupId: this.groupId,
        year: this.year,
        semester: this.semester
      }
    });
  }

  onDelete(id) {
    this.groupScheduleService.deleteGroupSemesterSubject(this.groupId, this.year, this.semester, id);
  }

  ngOnInit() {
    Observable.combineLatest([this.route.params, this.route.parent.params]).switchMap(
      ([childParams, parentParams]) => {
        this.groupId = +parentParams.groupid;
        this.year = +childParams.year;
        this.semester = +childParams.semester;
        return this.groupScheduleService.getGroupSemesterSubjects(this.groupId, this.year, this.semester);
      }).subscribe(subjects => {
      this.subjects = subjects;
      this.dataSource = new MatTableDataSource(this.subjects);
    });
  }

}
