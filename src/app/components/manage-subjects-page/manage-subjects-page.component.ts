import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SubjectsService } from '../../shared/services/subjects.service';

@Component({
  selector: 'app-manage-subjects-page',
  templateUrl: './manage-subjects-page.component.html',
  styleUrls: ['./manage-subjects-page.component.scss']
})
export class ManageSubjectsPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private subjectsService: SubjectsService
  ) { }

  dataSource;
  subjects;
  displayedColumns = ['subject', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDelete(subject) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        windowTitle: 'Видалення предмета',
        itemName: subject.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectsService.deleteSubject(subject.id);
      }
    });
  }

  openAddSubjectDialog() {
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '250px',
      data: {
        mode: 'add'
      }
    });
  }

  openEditSubjectDialog(subject) {
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '250px',
      data: {
        mode: 'edit',
        subject: subject
      }
    });
  }

  ngOnInit() {
    this.subjectsService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.dataSource = new MatTableDataSource(this.subjects);
    });

    this.dataSource.sort = this.sort;
  }

}
