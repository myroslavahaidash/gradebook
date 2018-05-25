import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../students.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-manage-group-students-page',
  templateUrl: './manage-group-students-page.component.html',
  styleUrls: ['./manage-group-students-page.component.scss']
})
export class ManageGroupStudentsPageComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private studentsService: StudentsService) {
  }

  displayedColumns = ['name', 'edit', 'delete'];
  dataSource;
  students;
  groupId;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDelete(id) {
    this.studentsService.deleteStudent(id);
  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '250px',
      data: {
        mode: 'add',
        groupId: this.groupId
      }
    });
  }

  openEditStudentDialog(student) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '250px',
      data: {
        mode: 'edit',
        student
      }
    });
  }

  ngOnInit() {
    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.studentsService.getStudents(this.groupId);
      }).subscribe(students => {
        this.students = students;
        this.dataSource = new MatTableDataSource(this.students);
      });
  }
}

