import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';

const STUDENTS = [
  {
    id: 1,
    name: 'Egor Sobolev'
  },
  {
    id: 2,
    name: 'Anna Ivanova'
  },
  {
    id: 3,
    name: 'Valeria Andreeva'
  }
];


@Component({
  selector: 'app-manage-group-students-page',
  templateUrl: './manage-group-students-page.component.html',
  styleUrls: ['./manage-group-students-page.component.scss']
})
export class ManageGroupStudentsPageComponent implements OnInit {
  displayedColumns = ['name', 'edit', 'delete'];
  dataSource = new MatTableDataSource(STUDENTS);
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onEdit(subject) {

  }

  onDelete(id) {
    console.log(id);
  }

  openAddTeacherDialog() {
    let dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEditTeacherDialog() {
    let dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}

