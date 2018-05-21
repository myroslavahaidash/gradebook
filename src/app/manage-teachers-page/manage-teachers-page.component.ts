import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { TeacherDialogComponent } from '../teacher-dialog/teacher-dialog.component';

const TEACHERS = [
  {
    id: 1,
    name: 'Dimitri Antoniadis'
  },
  {
    id: 2,
    name: 'Tim Berners-Lee'
  },
  {
    id: 3,
    name: 'Dimitri Bertsekas'
  },
  {
    id: 4,
    name: 'Tamara Broderick'
  }
];


@Component({
  selector: 'app-manage-teachers-page',
  templateUrl: './manage-teachers-page.component.html',
  styleUrls: ['./manage-teachers-page.component.scss']
})
export class ManageTeachersPageComponent implements OnInit {
  displayedColumns = ['name', 'edit', 'delete'];
  dataSource = new MatTableDataSource(TEACHERS);
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
    let dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEditTeacherDialog() {
    let dialogRef = this.dialog.open(TeacherDialogComponent, {
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
