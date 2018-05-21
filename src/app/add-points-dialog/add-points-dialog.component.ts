import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-points-dialog',
  templateUrl: './add-points-dialog.component.html',
  styleUrls: ['./add-points-dialog.component.scss']
})
export class AddPointsDialogComponent implements OnInit {
  date;

  constructor(
    public dialogRef: MatDialogRef<AddPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date = new Date();
  }

  onAddClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
