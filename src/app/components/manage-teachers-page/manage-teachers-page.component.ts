import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { TeacherDialogComponent } from '../teacher-dialog/teacher-dialog.component';
import { TeachersService } from '../../shared/services/teachers.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-teachers-page',
  templateUrl: './manage-teachers-page.component.html',
  styleUrls: ['./manage-teachers-page.component.scss']
})
export class ManageTeachersPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private teachersService: TeachersService
  ) { }

  dataSource;
  teachers;
  displayedColumns = ['name', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDelete(teacher) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        windowTitle: 'Видалення викладача',
        itemName: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teachersService.deleteTeacher(teacher.id);
      }
    });
  }

  openAddTeacherDialog() {
    const dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '250px',
      data: {
        mode: 'add'
      }
    });
  }

  openEditTeacherDialog(teacher) {
    const dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '250px',
      data: {
        mode: 'edit',
        teacher
      }
    });
  }

  ngOnInit() {
    this.teachersService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.dataSource = new MatTableDataSource(this.teachers);
    });

    this.dataSource.sort = this.sort;
  }
}
