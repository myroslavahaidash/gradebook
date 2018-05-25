import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddPointsDialogComponent } from '../add-points-dialog/add-points-dialog.component';
import { GradesService } from '../grades.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.scss']
})
export class StudentBoardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private gradesService: GradesService,
    private route: ActivatedRoute
  ) { }

  studentId;
  subjectId;
  grades;
  dataSource;
  displayedColumns = ['description', 'points', 'createdAt', 'delete'];
  finalGrade;

  openDialog() {
    let dialogRef = this.dialog.open(AddPointsDialogComponent, {
      width: '250px',
      data: {
        studentId: this.studentId,
        courseId: this.subjectId
      }
    });
  }

  onDelete(grade) {
    this.gradesService.deleteGrade(this.studentId, this.subjectId, grade.id);
  }

  setFinalGrade() {
    this.gradesService.createFinalGrade(this.studentId, this.subjectId)
      .subscribe(finalGrade => this.finalGrade = finalGrade);
  }

  ngOnInit() {
    Observable.combineLatest([this.route.params, this.route.parent.params]).switchMap(
      ([childParams, parentParams]) => {
        this.subjectId = +parentParams.subjectid;
        this.studentId = +childParams.studentid;
        return this.gradesService.getGrades(this.studentId, this.subjectId);
      }).subscribe(grades => {
      this.grades = grades;
      this.finalGrade = this.grades.finalGrade;
      this.dataSource = new MatTableDataSource(this.grades.currentGrades);
    });
  }
}
