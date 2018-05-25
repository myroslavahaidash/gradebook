import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {

  constructor(
    private studentsService: StudentsService,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  mode;
  lastName;
  firstName;
  middleName;
  email;

  onSubmit() {
    if (this.data.mode === 'add') {
      this.studentsService.createStudent(this.data.groupId, this.email, this.firstName, this.lastName, this.middleName);
      this.dialogRef.close();
    }

    if (this.data.mode === 'edit') {
      this.studentsService.updateStudent(this.data.student.id, this.firstName, this.lastName, this.middleName);
      this.dialogRef.close();
    }
  }

  ngOnInit() {
    this.mode = this.data.mode;
    if (this.data.mode === 'edit' && this.data.student) {
      this.firstName = this.data.student.firstName;
      this.lastName = this.data.student.lastName;
      this.middleName = this.data.student.middleName;
    }
  }

}
