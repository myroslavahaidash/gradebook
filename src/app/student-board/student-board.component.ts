import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPointsDialogComponent } from '../add-points-dialog/add-points-dialog.component';

const STUDENT = {
  name: 'Andrey Ivanov'
};

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.scss']
})
export class StudentBoardComponent implements OnInit {
  student = STUDENT;
  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddPointsDialogComponent, {
      width: '250px',
      data: { student: this.student }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}
