import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddPointsDialogComponent } from '../add-points-dialog/add-points-dialog.component';
import { GradesService } from '../grades.service';
import { StudentsService } from '../students.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import { gradeNumberToLetter } from './../grades.helper';

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.scss']
})
export class StudentBoardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private gradesService: GradesService,
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) { }

  studentId;
  subjectId;
  grades;
  dataSource;
  displayedColumns = ['description', 'points', 'createdAt', 'delete'];
  finalGrade;
  currentGradesTotal;
  student;

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        windowTitle: 'Видалення оцінки',
        itemName: grade.description + ' - ' + grade.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gradesService.deleteGrade(this.studentId, this.subjectId, grade.id);
      }
    });
  }

  setFinalGrade() {
    console.log(this.grades);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        windowTitle: 'Фінальна оцінка',
        itemName: `${this.grades.currentGradesTotal} (${gradeNumberToLetter(this.grades.currentGradesTotal)})`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gradesService.createFinalGrade(this.studentId, this.subjectId)
          .subscribe(finalGrade => {
            this.finalGrade = finalGrade;
          });
      }
    });
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
      this.currentGradesTotal = this.grades.currentGradesTotal;
      this.dataSource = new MatTableDataSource(this.grades.currentGrades);
    });

    this.route.params.switchMap(params => {
      return this.studentsService.getStudent(+params.studentid);
    }).subscribe(student => this.student = student);
  }
}
