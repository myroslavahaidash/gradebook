import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss']
})
export class TeacherDialogComponent implements OnInit {

  constructor(
    private teachersService: TeachersService,
    private dialogRef: MatDialogRef<TeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  mode;
  lastName;
  firstName;
  middleName;
  email;

  onSubmit() {
    if (this.data.mode === 'add') {
      this.teachersService.createTeacher(this.email, this.firstName, this.lastName, this.middleName);
      this.dialogRef.close();
    }

    if (this.data.mode === 'edit') {
      this.teachersService.updateTeacher(this.data.teacher.id, this.firstName, this.lastName, this.middleName);
      this.dialogRef.close();
    }
  }

  ngOnInit() {
    this.mode = this.data.mode;
    if (this.data.mode === 'edit' && this.data.teacher) {
      this.firstName = this.data.teacher.firstName;
      this.lastName = this.data.teacher.lastName;
      this.middleName = this.data.teacher.middleName;
    }
  }

}
