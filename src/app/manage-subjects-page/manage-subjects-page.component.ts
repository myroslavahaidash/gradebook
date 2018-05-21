import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';

const SUBJECTS = [
  {
    id: 1,
    name: 'Economics'
  },
  {
    id: 2,
    name: 'History'
  },
  {
    id: 3,
    name: 'Literature'
  },
  {
    id: 4,
    name: 'Management'
  }
];


@Component({
  selector: 'app-manage-subjects-page',
  templateUrl: './manage-subjects-page.component.html',
  styleUrls: ['./manage-subjects-page.component.scss']
})
export class ManageSubjectsPageComponent implements OnInit {
  displayedColumns = ['subject', 'edit', 'delete'];
  dataSource = new MatTableDataSource(SUBJECTS);
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

  openAddSubjectDialog() {
    let dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEditSubjectDialog() {
    let dialogRef = this.dialog.open(SubjectDialogComponent, {
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
