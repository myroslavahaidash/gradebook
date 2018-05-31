import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradesService } from '../../shared/services/grades.service';

@Component({
  selector: 'app-add-points-dialog',
  templateUrl: './add-points-dialog.component.html',
  styleUrls: ['./add-points-dialog.component.scss']
})
export class AddPointsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPointsDialogComponent>,
    private gradesService: GradesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date = new Date();
  }

  value;
  description;
  date;

  onSubmit() {
    this.gradesService.createGrade(this.data.studentId, this.data.courseId, this.value, this.description, this.date);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
