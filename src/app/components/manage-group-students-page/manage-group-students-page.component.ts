import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../shared/services/students.service';
import { GroupsService } from '../../shared/services/groups.service';
import 'rxjs/add/operator/switchMap';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-group-students-page',
  templateUrl: './manage-group-students-page.component.html',
  styleUrls: ['./manage-group-students-page.component.scss']
})
export class ManageGroupStudentsPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private groupsService: GroupsService
  ) {}

  displayedColumns = ['name', 'edit', 'delete'];
  dataSource;
  students;
  groupId;
  group;

  onDelete(student) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        windowTitle: 'Видалення студента',
        itemName: `${student.lastName} ${student.firstName} ${student.middleName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.deleteStudent(student.id);
      }
    });
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

    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.groupsService.getGroup(this.groupId);
      }).subscribe(group => {
      this.group = group;
    });
  }
}

